const mysql = require("mysql2");
const express = require("express");
const app = express();
const PORT = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: "localhost",          // Cambia esto si es necesario
    user: "root",              // Usuario de la base de datos
    password: "199803",        // Contraseña de la base de datos
    database: "LOGIN", // Cambia esto por el nombre de tu base de datos
    port: 3306
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conexión exitosa a la base de datos MySQL");
});

// Middleware para servir archivos estáticos y parsear JSON
app.use(express.static("public"));
app.use(express.json());

// Ruta POST para manejar el login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Consulta a la base de datos para verificar el usuario y la contraseña
    const query = "SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?";
    db.execute(query, [username, password], (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ message: "Error del servidor" });
        }

        // Verificar si se encontró el usuario
        if (results.length > 0) {
            res.json({ message: "Inicio de sesión exitoso" });
        } else {
            res.json({ message: "Usuario o contraseña incorrectos" });
        }
    });
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
