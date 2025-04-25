const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proyect = sequelize.define('Proyect', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  administrador_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'proyectos',
  timestamps: false
});

// Definición de asociaciones
Proyect.associate = function(models) {
  // Relación con el administrador
  Proyect.belongsTo(models.User, {
    foreignKey: 'administrador_id',
    as: 'administrador'
  });
  
  // Relación muchos-a-muchos con usuarios
  Proyect.belongsToMany(models.User, {
    through: 'usuarios_proyectos',
    as: 'usuarios',
    foreignKey: 'proyecto_id',
    otherKey: 'usuario_id'
  });
};

module.exports = Proyect; // Exportación correcta