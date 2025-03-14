const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userproyect.model');

// Relaciones muchos a muchos "belongsToMany"

User.belongsToMany(Proyect, { through: UserProyect, foreingkey: 'usuario_id', as: 'proyectos'});
Proyect.belongsToMany(User, { through: UserProyect, foreingkey: 'proyecto_id', as: 'usuarios'});

// Relación de administrador 
Proyect.belongsToMany(User, { foreingkey: 'administrador_id', as: 'administrador'});

module.exports - { User, Proyect, UserProyect };