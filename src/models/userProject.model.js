// Importamos los tipos de datos de Sequelize y la configuración de la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo "UserProyect" que representa la tabla intermedia "usuarios_proyectos" en la base de datos.
const UserProject = sequelize.define('usuarios_proyectos', {
    // Campo "id": aunque no es clave primaria aquí, se incrementará automáticamente.
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: false, // NOTA: Esto es inusual; típicamente, "id" sería clave primaria.
        autoIncrement: true 
    },
    // Campo "usuario_id": clave foránea que referencia al campo "id" de la tabla "usuarios".
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'usuarios', // Corregí "usuario" a "usuarios" para que coincida con el nombre habitual de la tabla de usuarios.
            key: 'id' 
        }
    },
    // Campo "proyecto_id": clave foránea que referencia al campo "id" de la tabla "proyectos".
    proyecto_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { 
            model: 'proyectos', 
            key: 'id' 
        }
    }
}, {
    // Configuración adicional del modelo.
    timestamps: false, // No se incluyen los campos automáticos "createdAt" y "updatedAt".
    tableName: 'usuarios_proyectos' // Nombre explícito de la tabla intermedia en la base de datos.
});

// Exportamos el modelo para poder usarlo en otras partes del proyecto.
module.exports = UserProyect;