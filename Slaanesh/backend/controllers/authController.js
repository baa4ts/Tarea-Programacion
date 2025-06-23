const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

function isEmail(input) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}
exports.register = async (req, res) => {
  const { name, gmail, password } = req.body;
  if (!name || !gmail || !password)
    return res.status(400).json({ msg: "Faltan datos" });

  try {
    const querySelect = `SELECT * FROM usuario WHERE name = ? AND gmail = ?`;
    const [check] = await pool.execute(querySelect, [name, gmail]);

    if (check.length > 0) {
      return res.status(409).json({ msg: "El usuario o correo ya existe" });
    }

    const hash = bcrypt.hashSync(password, 10);

    const queryInsert = `
      INSERT INTO usuario (name, gmail, passwordhas)
      VALUES (?, ?, ?)
    `;
    await pool.execute(queryInsert, [name, gmail, hash]);

    res.status(201).json({ msg: "Usuario registrado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al registrar" });
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ msg: "Faltan datos" });

  try {
    let query, values;

    if (isEmail(name)) {
      query = `SELECT * FROM usuario WHERE gmail = ?`;
      values = [name];
    } else {
      query = `SELECT * FROM usuario WHERE name = ?`;
      values = [name];
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

exports.user = async (req, res) => {
  const datos = {
    username: "Rulasia",
  };

  res.status(200).json(datos);
};
