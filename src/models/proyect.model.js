const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proyect = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primarykey: false, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, 
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } 
    }, 
    
}, {
    timestamps: false,
    tableName: 'proyectos',
    // Lo siguiente es para organizar la hora referente zona horaria de Colombia 
    hooks: {
        afterCreate: (proyect, options) => {
            if (prpyect.fecha_creacion) {
                proyect.fecha_creacion.setHours(proyect.fecha_creacion.getHours()- 5);// Se restan 5 horas para cuadrar la zona horaria
            }
        }
    }
});

module.exports = Proyect;