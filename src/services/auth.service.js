const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const RolePermission = require('../models/rolePermission.model');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (email, password) => {
    try {
        // 1. Validar entrada
        if (!email || !password) {
            throw new Error('Email y contraseña son requeridos');
        }

        // 2. Buscar usuario
        const user = await User.findOne({ 
            where: { email },
            attributes: ['id', 'nombre', 'email', 'password', 'rol_id']
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // 3. Verificar contraseña (corrección importante)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { // Cambié esta condición
            throw new Error('Contraseña incorrecta');
        }

        // 4. Obtener permisos del rol
        const rolePermissions = await RolePermission.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['permiso_id']
        });

        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // 5. Generar token
        if (!SECRET_KEY) {
            throw new Error('JWT_SECRET no está configurado');
        }

        const token = jwt.sign(
            { 
                id: user.id, 
                nombre: user.nombre, 
                email: user.email, 
                rol_id: user.rol_id, 
                permisos 
            },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // 6. Retornar datos relevantes (sin password)
        return {
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol_id: user.rol_id
            },
            token,
            permisos
        };

    } catch (error) {
        console.error('Error en auth.service:', error);
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};