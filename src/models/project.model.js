const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo Proyect
const Proyect = sequelize.define('Proyect', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  administrador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  }
}, {
  tableName: 'proyectos',       // Nombre exacto de la tabla en PostgreSQL
  timestamps: false,           // Desactiva createdAt y updatedAt
  underscored: true,           // Usa snake_case para los nombres de columnas
  freezeTableName: true        // Evita la pluralización automática
});

// Definición de asociaciones


module.exports = Proyect;