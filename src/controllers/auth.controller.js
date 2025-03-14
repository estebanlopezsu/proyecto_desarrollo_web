// importamos el servicio de autenticacion

const authService = require('../services/auth.service');

// Iniciar sesión

exports.logion = async (req, res) => {
    const { email, password } = req.body;
    try{
        const token = await authService.loginUser(email, password);
        res.status(200).json({message: 'inicio de sesion éxitoso', token });
    } catch (err) {
        res.status(400).json({ message: err.messege});
    }
};