// Importamos los tipos de datos de Sequelize y la configuración de la base de datos.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definimos el modelo "Proyect" (Proyectos) que representa la tabla "proyectos" en la base de datos.
const Proyect = sequelize.define('proyectos', {
    // Campo "id": clave primaria, numérica, auto-incremental.
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, // "primaryKey".
        autoIncrement: true 
    },
    // Campo "nombre": almacena el nombre del proyecto, obligatorio.
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // Campo "descripcion": almacena una breve descripción del proyecto, obligatorio.
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }, 
    // Campo "fecha_creacion": fecha en que se creó el proyecto, con un valor por defecto (fecha actual).
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    }, 
    // Campo "administrador_id": referencia al usuario que administra el proyecto.
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
            model: 'usuarios', // La tabla relacionada es "usuarios".
            key: 'id' // La clave foránea apunta al campo "id".
        } 
    }, 
}, {
    // Configuración adicional del modelo.
    timestamps: false, // Desactiva los campos automáticos "createdAt" y "updatedAt".
    tableName: 'proyectos', // Nombre explícito de la tabla en la base de datos.

    // Configuración de hooks: acciones automáticas tras ciertos eventos.
    hooks: {
        afterCreate: (proyect, options) => {
            // Ajustamos la hora de creación para que coincida con la zona horaria de Colombia.
            if (proyect.fecha_creacion) { // Corrección: "prpyect" -> "proyect".
                proyect.fecha_creacion.setHours(proyect.fecha_creacion.getHours() - 5); // Restamos 5 horas.
            }
        }
    }
});

// Exportamos el modelo para usarlo en otras partes del proyecto.
module.exports = Proyect;