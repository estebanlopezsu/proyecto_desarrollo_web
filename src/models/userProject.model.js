const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Modelo 'UserProject' (Usuario-Proyecto) para la base de datos
 * Representa la tabla de relación muchos-a-muchos entre usuarios y proyectos
 */
const UserProject = sequelize.define('UserProject', {
  // ID del usuario - Parte de la clave primaria compuesta
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'usuarios',       // Tabla referenciada
      key: 'id',               // Campo referenciado
      onDelete: 'CASCADE',     // Eliminar relación si se borra el usuario
      onUpdate: 'CASCADE'      // Actualizar relación si cambia el ID del usuario
    },
    validate: {
      isInt: {
        msg: 'El ID de usuario debe ser un número entero'
      }
    }
  },
  
  // ID del proyecto - Parte de la clave primaria compuesta
  proyecto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'proyectos',      // Tabla referenciada
      key: 'id',               // Campo referenciado
      onDelete: 'CASCADE',     // Eliminar relación si se borra el proyecto
      onUpdate: 'CASCADE'      // Actualizar relación si cambia el ID del proyecto
    },
    validate: {
      isInt: {
        msg: 'El ID de proyecto debe ser un número entero'
      }
    }
  }
  
}, {
  // Configuraciones del modelo
  tableName: 'usuarios_proyectos',  // Nombre exacto de la tabla de relación
  timestamps: false,               // No usar campos createdAt/updatedAt
  underscored: true,               // Usar snake_case para compatibilidad con PostgreSQL
  freezeTableName: true,           // Evitar pluralización automática
  
  // Opcional: Índices para mejorar rendimiento
  indexes: [
    {
      unique: true,
      fields: ['usuario_id', 'proyecto_id'] // Índice compuesto único
    },
    {
      fields: ['usuario_id']                // Índice individual
    },
    {
      fields: ['proyecto_id']               // Índice individual
    }
  ]
});

module.exports = UserProject;