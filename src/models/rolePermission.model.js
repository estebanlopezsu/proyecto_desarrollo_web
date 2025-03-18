// Importamos los tipos de datos de Sequelize y la configuración de la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Corrección: "requir" -> "require" y "confing" -> "config".

// Definimos el modelo "rolePermission" que representa la tabla intermedia "roles_permisos" en la base de datos.
const rolePermission = sequelize.define('roles_permisos', {
    // Campo "rol_id": clave foránea que referencia al campo "id" de la tabla "roles".
    rol_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'roles', key: 'id' }
    },
    // Campo "permiso_id": clave foránea que referencia al campo "id" de la tabla "permisos".
    permiso_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: 'permisos', key: 'id' }
    }
}, {
    // Configuración adicional del modelo.
    timestamps: false, // Corrección: "timestamp" -> "timestamps". Esto desactiva "createdAt" y "updatedAt".
    tableName: 'roles_permisos' // Se asegura de que el nombre de la tabla sea exactamente "roles_permisos".
});

// Exportamos el modelo para poder usarlo en otras partes del proyecto.
module.exports = rolePermission;