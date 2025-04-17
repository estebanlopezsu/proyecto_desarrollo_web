// Importamos los modelos de usuario, proyecto y el de usarios-proyectos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Definimos las relaciones 
// Relaciones muchos a muchos "belongsToMany", entre usuarios y proyectos
User.belongsToMany(Project, { through: UserProject, foreignkey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, { through: UserProject, foreignkey: 'proyecto_id', as: 'usuarios'});

// Relación de un proyecto con su administrador "belongsTo"
Project.belongsTo(User, { foreignkey: 'administrador_id', as: 'administrador'});

// Se exporta el modelo con sus relaciones definidas
module.exports = { User, Project, UserProject };