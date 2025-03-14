const { DataTypes } = require('sequelize');
const sequelize = requir('../confing/database');

const rolePermission = sequelize.define('roles_permisos', {
    rol_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'roles', key: 'id' }},
    permiso_id: { type: DataTypes.INTEGER, allowNull: false, references: {model: 'permisos', key: 'id' }}
}, {
    timestamp: false,
    tableName: 'roles_permisos',
});

module.exports = rolePermission;