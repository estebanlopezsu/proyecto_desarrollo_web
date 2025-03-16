const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserProyect = sequelize.define('usuarios_proyectos', {
    id: { type: DataTypes.INTEGER, primaryKey: false, autoIncrement: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuario', key: 'id' }
    },
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'proyectos', key: 'id' }
    },
}, {
    timestamps: false,
    tableName: 'usuarios_proyectos',
});

module.exports = UserProyect;