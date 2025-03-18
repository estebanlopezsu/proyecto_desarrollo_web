// Importamos los tipos de datos de Sequelize y la configuración de la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Corrección: "confing" -> "config".

// Definimos el modelo "User" que representa la tabla "usuarios" en la base de datos.
const User = sequelize.define('usuarios', {
    // Campo "id": clave primaria, numérica y auto-incremental.
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Campo "nombre": almacena el nombre del usuario. Este campo es obligatorio.
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo "email": almacena el correo electrónico del usuario. Obligatorio y único.
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    // Campo "password": almacena la contraseña del usuario. Obligatorio.
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo "rol_id": clave foránea que referencia el rol asociado al usuario.
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'roles', // Tabla relacionada: "roles".
            key: 'id' // Clave foránea apunta al campo "id".
        }
    }, 
    // Campo "administrador_id": clave foránea que referencia al usuario administrador.
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'usuarios', // Tabla relacionada: "usuarios".
            key: 'id' // Clave foránea apunta al campo "id".
        }
    }
}, {
    // Configuración adicional del modelo.
    timestamps: false, // Desactiva los campos automáticos "createdAt" y "updatedAt".
    tableName: 'usuarios' // Establece el nombre explícito de la tabla.
});

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = User;