// importamos el servicio de autenticacion

const authService = require('../services/auth.service');

// Iniciar sesión

// Esta función se usará para manejar el inicio de sesión de los usuarios.
exports.login = async (req, res) => {
    // Tomamos el correo y la contraseña que el usuario envió en su solicitud.
    const { email, password } = req.body;
    try {
        
        // Intentamos iniciar sesión con esos datos y obtenemos un token si todo sale bien.
        const token = await authService.loginUser(email, password);
        console.log(token)
        // Si todo funcionó, enviamos una respuesta diciendo que el inicio de sesión fue exitoso.
        res.status(200).json({ message: 'inicio de sesión exitoso', token });
    } catch (err) {
        console.log(err);
        // Si hubo un problema, enviamos una respuesta con un error.
        res.status(400).json({ message: err.message }); // Corregí "messege" a "message".
    }
};


