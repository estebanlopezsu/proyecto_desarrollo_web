const Proyect = require('../models/project.model');
const User = require('../models/user.model'); // Importación añadida



exports.createProject = async (nombre, descripcion, administrador_id, admin_from_token) => {
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
      const proyectos = await Proyect.findAll({
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
        ]
      });
      return proyectos;
    } catch (err) {
      console.error('Error en getAllProjects:', err);
      throw new Error('Error al obtener proyectos');
    }
  };
exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

exports.assingUsersToProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado');
    
    const users = await User.findAll({ where: { id: data.userIds }});
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados');

    await project.addUsuarios(users);
    return await project.findByPk(data.project, {
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ],
    });
};

exports.removeUserFromProject = async (data) => {
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Usuario no encontrado');

    const user = await User.findByPk(data.userId);
    if (!user) throw new Error('Usuario no encontrado');

    await project.removeUsuario(user);
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
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};