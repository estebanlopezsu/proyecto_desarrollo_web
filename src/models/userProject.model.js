const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProject = sequelize.define('UserProject', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  proyecto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'usuarios_proyectos',
  timestamps: false
});

module.exports = UserProject; 