const sequelize = require('../config/database');
const Proyect = require('../models/project.model');
const User = require('../models/user.model'); // Importación añadida


exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        // 1. Verifica que el usuario administrador exista
        const usuarioExistente = await User.findByPk(administrador_id);
        if (!usuarioExistente) {
            throw new Error('El usuario administrador no existe en la base de datos');
        }


        // 3. Crea el proyecto
        const nuevoProyecto = await Proyect.create({
            nombre,
            descripcion,
            administrador_id
        });

        return nuevoProyecto;
    } catch (err) {
        // Mejora el mensaje de error
        throw new Error(`Error al crear proyecto: ${err.message}`);
    }
};

exports.getAllProjects = async () => {
  try {
    return await Proyect.findAll({ // <-- Usa Proyect con "y"
      include: [
        {
          model: User,
          as: 'administrador',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: User,
          as: 'usuarios',
          attributes: ['id', 'nombre', 'email'],
          through: { attributes: [] }
        }
      ],
      order: [['fecha_creacion', 'DESC']] // Opcional: ordenar por fecha
    });
  } catch (err) {
    console.error('Error detallado en getAllProjects:', {
      message: err.message,
      stack: err.stack,
      // Debug adicional
      isProyectModel: typeof Proyect === 'function',
      isUserModel: typeof User === 'function'
    });
    throw new Error('Error al obtener proyectos: ' + err.message);
  }
};


exports.assingUsersToProject = async (data) => {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. Verificar existencia del proyecto
      const proyect = await Proyect.findByPk(data.proyectId, { transaction });
      if (!proyect) {
        throw new Error(`Proyecto con ID ${data.proyectId} no encontrado`);
      }
  
      // 2. Verificar usuarios existentes
      const users = await User.findAll({
        where: { id: data.userIds },
        transaction,
        attributes: ['id', 'nombre', 'email']
      });
  
      if (users.length !== data.userIds.length) {
        const missingIds = data.userIds.filter(id => !users.some(u => u.id === id));
        throw new Error(`Usuarios no encontrados: ${missingIds.join(', ')}`);
      }
  
      // 3. SOLUCIÓN DEFINITIVA - Inserción directa
      const insertQuery = `
        INSERT INTO usuarios_proyectos (proyecto_id, usuario_id) 
        VALUES (${data.proyectId}, ${data.userIds[0]})
        ON CONFLICT (proyecto_id, usuario_id) DO NOTHING
        RETURNING *`;
      
      const [result] = await sequelize.query(insertQuery, { transaction });
      console.log('Resultado de inserción:', result);
  
      // 4. Obtener proyecto actualizado (forma alternativa)
      const updatedProyect = await Proyect.findByPk(data.proyectId, {
        include: [{
          model: User,
          as: 'usuarios',
          attributes: ['id', 'nombre', 'email'],
          through: { attributes: [] }
        }],
        transaction
      });
  
      await transaction.commit();
      return updatedProyect;
  
    } catch (error) {
      await transaction.rollback();
      console.error('Error detallado:', {
        error: error.message,
        stack: error.stack,
        query: error.sql
      });
      throw new Error('Error al asignar usuarios al proyecto');
    }
  };
  
  

  exports.removeUserFromProject = async (data) => {
    const transaction = await sequelize.transaction();
    
    try {
      // 1. Verificar que exista el proyecto (usando Proyect, no Project)
      const proyect = await Proyect.findByPk(data.proyectId, { transaction });
      if (!proyect) {
        throw new Error(`Proyecto con ID ${data.proyectId} no encontrado`);
      }
  
      // 2. Verificar que exista el usuario
      const user = await User.findByPk(data.userId, { transaction });
      if (!user) {
        throw new Error(`Usuario con ID ${data.userId} no encontrado`);
      }
  
      // 3. Eliminar la relación usando los nombres exactos de tus columnas
      const [result] = await sequelize.query(
        `DELETE FROM usuarios_proyectos 
         WHERE proyecto_id = $1 AND usuario_id = $2
         RETURNING *`,
        {
          bind: [data.proyectId, data.userId],
          transaction
        }
      );
  
      if (result.length === 0) {
        throw new Error('El usuario no estaba asignado a este proyecto');
      }
  
      await transaction.commit();
      
      return {
        success: true,
        message: 'Usuario eliminado del proyecto correctamente',
        data: result[0]
      };
  
    } catch (error) {
      await transaction.rollback();
      console.error('Error en removeUserFromProject:', {
        error: error.message,
        proyectId: data.proyectId,
        userId: data.userId,
        stack: error.stack
      });
      throw error;
    }
  };
  

exports.updateProject = async (id, nombre, descripcion) => {
    try {
        // 1. Buscar el proyecto
        const proyecto = await Proyect.findByPk(id);
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }

        // 2. Actualizar solo nombre y descripción (sin cambiar administrador_id)
        await proyecto.update({
            nombre,
            descripcion
        });

        return proyecto;
    } catch (err) {
        throw new Error(`Error al actualizar proyecto: ${err.message}`);
    }
};

exports.deleteProject = async (id) => {
    try {
        // 1. Verificar que el ID sea válido
        const proyectoId = parseInt(id);
        if (isNaN(proyectoId)) {
            throw new Error('ID de proyecto inválido');
        }

        // 2. Buscar y eliminar usando el nombre correcto "Proyect"
        const proyecto = await Proyect.findByPk(proyectoId);
        if (!proyecto) {
            throw new Error('Proyecto no encontrado');
        }
        
        await proyecto.destroy();
        
        return { 
            success: true,
            message: 'Proyecto eliminado con éxito',
            deletedId: proyectoId 
        };
    } catch (err) {
        console.error('Error detallado en deleteProject:', {
            error: err.message,
            idRecibido: id,
            stack: err.stack
        });
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};

