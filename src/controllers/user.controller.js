const userService = require('../services/user.service');
exports.createUser = async (rep, res) => {
    try {
        const { nombre, email, password, rol_id, administrador_id } = req.body;
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);
        res.status(281).json({message: 'Usuario creado con éxito', user: newUser }); //281 para la creacion
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

exports.updateUser = async (rep, res) => {
    const { id } = req.params;
};

//Hacer el primer edpoint de proyectos 