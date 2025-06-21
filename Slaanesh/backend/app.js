require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Primero aplicas CORS
app.use(
  cors({
    origin: "*", // o "*"
  })
);

app.use(express.json());

// Luego tus rutas
app.use("/api", authRoutes);

app.get("", (req, res) => {
  res.send("Hola");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
