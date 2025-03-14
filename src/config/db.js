const {Sequelize} = require('sequalize');
const dotenv = require('dotenv');

dotenv.confing();

const sequalize = new Sequelize (Process.env.DB_NAME, Process.ENV.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,  
    dialect: 'postgres',
    port: process.env.DB_PORT
    logging: false,
    timezone: '-05:00'    
    
});

module.exports = sequalize;

//Falta codigo al inicio y posiblemete al finalizar