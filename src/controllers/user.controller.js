// Importa el servicio de usuarios, que se encargará de la lógica para manejar datos de usuarios.
const userService = require('../services/user.service');

// Esta función se encargará de crear un nuevo usuario.
exports.createUser = async (req, res) => { // Corrección: "rep" debe ser "req" para representar correctamente la solicitud.
    try {
        // Extraemos los datos necesarios para crear el usuario desde el cuerpo de la solicitud.
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        
        // Creamos un nuevo usuario utilizando el servicio correspondiente.
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        
        // Respondemos con un mensaje de éxito y el nuevo usuario creado.
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser }); // Cambié 281 por 201 (el código estándar para creación exitosa).
    } catch (err) {
        // Si algo sale mal, respondemos con un error interno del servidor.
        res.status(500).json({ message: err.message });
    }
};

// Esta función es para actualizar los datos de un usuario existente.
exports.updateUser = async (req, res) => { // Corrección: "rep" debe ser "req" para representar la solicitud.
    // Extraemos el ID del usuario desde los parámetros de la solicitud.
    const { id } = req.params;
    
    // Aún no se ha implementado la lógica para esta función. Podrías añadirla aquí.
};


