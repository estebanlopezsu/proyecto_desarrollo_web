// Importa el paquete dotenv, que permite cargar variables de entorno desde un archivo .env.
const dotenv = require('dotenv');

// Configura dotenv para cargar y procesar las variables de entorno definidas en el archivo .env.
dotenv.config();

// Exporta un objeto con las variables de configuración que serán utilizadas por la aplicación.
module.exports = {
    PORT: process.env.PORT, // El puerto en el que la aplicación escuchará (por ejemplo, 3000).
    DB_NAME: process.env.DB_NAME, // Nombre de la base de datos (corrige el error: "process.env.DB.NAME" debe ser "process.env.DB_NAME").
    DB_USER: process.env.DB_USER, // Usuario de la base de datos.
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña para acceder a la base de datos.
    DB_HOST: process.env.DB_HOST, // Dirección del servidor de la base de datos (por ejemplo, "localhost").
    DB_PORT: process.env.DB_PORT, // Puerto del servidor de la base de datos (por ejemplo, 5432).
    JWT_SECRET: process.env.JWT_SECRET // Secreto utilizado para firmar los tokens JWT (JSON Web Tokens).
};
