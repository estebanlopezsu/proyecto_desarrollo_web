// Importamos los modelos de usuario, proyecto y la relación entre ambos.
const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userproyect.model');

// Relaciones muchos a muchos "belongsToMany"

// Relacionamos los usuarios con los proyectos mediante una tabla intermedia (UserProyect).
User.belongsToMany(Proyect, { through: UserProyect, foreignKey: 'usuario_id', as: 'proyectos' }); // Corrección: "foreingkey" -> "foreignKey".
Proyect.belongsToMany(User, { through: UserProyect, foreignKey: 'proyecto_id', as: 'usuarios' }); // Corrección: "foreingkey" -> "foreignKey".

// Relación de administrador 
// Vinculamos un proyecto con un administrador (usuario), pero aquí hay un problema técnico: "belongsToMany" no sería la relación adecuada para esto.
Proyect.belongsToMany(User, { foreignKey: 'administrador_id', as: 'administrador' }); // Corrección: "foreingkey" -> "foreignKey".

// Exportamos los modelos para que puedan ser utilizados en otras partes del proyecto.
module.exports = { User, Proyect, UserProyect }; // Corrección: "-" se cambió por "=".
