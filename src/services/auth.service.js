const jwt = require('jsonwebtoken'); //Importar libreria de jsonwebtoken
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv'); //Importar la variable de entorno
// importamos el modelo user y el modelo rol permisos
const User = require('../models/user.model');
const RolePermission = require('../models/rolePermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET; //Obtener la clave secreta desde las claves de entorno 
// exportamos un servicio que va recibir una email y un password
exports.loginUser = async (email, password) => {
    try{
        // verifica que el usuario existe
        const user = await User.findOne({ where: (email)}); // el findOne es un modelo que se utiliza con sequelize
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar si la contraseña es correcta 
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // Consultar permisos de rol
        const rolePermission = await RolePermission.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
                {expiresIn: '1h'}
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};