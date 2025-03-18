// Importamos Sequelize, que es una biblioteca para trabajar con bases de datos.
const { Sequelize } = require('sequelize'); 

// Importamos dotenv para manejar variables de entorno desde un archivo .env.
const dotenv = require('dotenv');

// Cargamos la configuración del archivo .env.
dotenv.config(); 

// Creamos una nueva instancia de Sequelize para conectar con la base de datos.
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos (lo tomamos de las variables de entorno).
    process.env.DB_USER, // Usuario de la base de datos.
    process.env.DB_PASSWORD, // Contraseña del usuario para acceder a la base de datos.
    {
        host: process.env.DB_HOST,  // Dirección del servidor donde está la base de datos.
        dialect: 'postgres', // Tipo de base de datos que estamos usando (PostgreSQL en este caso).
        port: process.env.DB_PORT, // Puerto donde escucha la base de datos.
        logging: false, // Desactiva los mensajes de registro de Sequelize.
        timezone: '-05:00' // Configura la zona horaria (por ejemplo, hora de Colombia).
    }
);

// Exportamos la instancia de Sequelize para que otros archivos puedan usarla.
module.exports = sequelize;
