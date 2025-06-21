const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Debe ser mysql2 pool con promesas

function isEmail(input) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

exports.register = async (req, res) => {
  const { name, gmail, password } = req.body;
  if (!name || !gmail || !password)
    return res.status(400).json({ msg: "Faltan datos" });

  try {
    const hash = bcrypt.hashSync(password, 10);

    const query = `
      INSERT INTO usuario (name, gmail, passwordhas)
      VALUES (?, ?, ?)
    `;
    await pool.execute(query, [name, gmail, hash]);

    res.status(201).json({ msg: "Usuario registrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al registrar" });
  }
};

exports.login = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) return res.status(400).json({ msg: "Faltan datos" });

  try {
    let query, values;

    if (isEmail(user)) {
      query = `SELECT * FROM usuario WHERE gmail = ?`;
      values = [user];
    } else {
      query = `SELECT * FROM usuario WHERE name = ?`;
      values = [user];
    }

    const [rows] = await pool.execute(query, values);

    if (rows.length === 0)
      return res.status(401).json({ msg: "Credenciales inválidas" });

    const userFound = rows[0];
    const valid = bcrypt.compareSync(password, userFound.passwordhas);

    if (!valid) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.json({ msg: "Login correcto", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en login" });
  }
};
