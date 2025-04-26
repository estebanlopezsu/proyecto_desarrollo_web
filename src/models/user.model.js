const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { 
      model: 'roles',
      key: 'id'
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  paranoid: true, // Para eliminación lógica (opcional)
  defaultScope: {
    attributes: { exclude: ['password'] } // No devolver password por defecto
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] } // Para cuando necesites el password
    }
  }
});

module.exports = User;

