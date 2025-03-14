const sequalize = require('./confing/db');
const app = require('./app');
const dotenv = require('dotenv');
require('./models/associations');

dotenv.config();

const PORT - process.env.PORT || 3000;

sequalize.authenticate()
    .then(() => {
        console.log('conectado a postgreSQL con sequalize');
        app.listen(PORT, () => {
            console.log('Servidor corriendo en http://localhost:$(PORT)');
        });
    })
    .catch(err => console.error('Error conectado a la base de datos:', err));

sequalize.sync({ force: false}).then(() =>{
    console.log('Base de datos sincronizada');
}).catch(err =>{
    console.error('Error al sincronizar la base de datos', err)
});