// Importar servicio de proyectos
const projectService = require('../services/project.service');
const Proyect = require('../models/project.model');

// Controlador para crear nuevos proyectos
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;
        const admin_from_token = req.user.administrador_id;
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id, admin_from_token);
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject});
    } catch (err) {
         console.log(err)

        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos asociados a un administrador
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.assingUsersToProject = async (req, res) => {
    try {
        const data = {
            proyectId: req.body.proyectId,  // Asegurar nombre consistente
            userIds: req.body.userIds
        };
        
        const result = await projectService.assingUsersToProject(data);
        
        res.status(200).json({ 
            message: 'Usuarios asignados al proyecto con éxito', 
            project: result 
        });
        
    } catch (err) {
        console.error('Error en assingUsersToProject:', err);
        
        const statusCode = err.message.includes('no encontrado') ? 404 : 500;
        res.status(statusCode).json({ 
            message: err.message 
        });
    }
};

exports.removeUserFromProject = async (req, res) => {
    try {
      // Validación mejorada
      if (!req.body.proyectId || !req.body.userId) {
        return res.status(400).json({
          success: false,
          error: 'Se requieren proyectId y userId en el body'
        });
      }
  
      // Convertir a números y validar
      const proyectId = Number(req.body.proyectId);
      const userId = Number(req.body.userId);
  
      if (isNaN(proyectId) || isNaN(userId)) {
        return res.status(400).json({
          success: false,
          error: 'proyectId y userId deben ser números válidos'
        });
      }
  
      const result = await projectService.removeUserFromProject({
        proyectId,
        userId
      });
      
      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
  
    } catch (error) {
      console.error('Error en controller.removeUserFromProject:', error);
      
      // Manejo específico de errores
      const statusCode = error.message.includes('no encontrado') ? 404 : 
                        error.message.includes('no estaba asignado') ? 400 : 500;
      
      res.status(statusCode).json({
        success: false,
        error: error.message,
        details: statusCode === 500 ? 'Error interno del servidor' : undefined
      });
    }
  };

// Controlador para obtener un proyecto por el id
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {

        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un proyecto
exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, administrador_id } = req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        // 1. Obtener el ID del proyecto (asegurando que sea un número)
        const projectId = parseInt(req.params.id);
        
        if (isNaN(projectId)) {
            return res.status(400).json({ message: 'ID de proyecto inválido' });
        }

        // 2. Verificar que el proyecto existe
        const proyecto = await Proyect.findByPk(projectId); // Pasar solo el ID numérico
        
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        // 3. Eliminar a través del servicio
        const result = await projectService.deleteProject(projectId);
        
        res.status(200).json(result);
    } catch (err) {
        console.error('Error en deleteProject:', {
            error: err.message,
            params: req.params,
            stack: err.stack
        });
        
        res.status(500).json({ 
            message: err.message || 'Error al eliminar proyecto',
            type: 'delete_error'
        });
    }
};