// Importamos Express, una biblioteca para construir aplicaciones web en Node.js.
const express = require('express');

// Creamos un enrutador que nos permitirá manejar rutas específicas de forma modular.
const router = express.Router();

// Importamos el controlador de autenticación, que contiene la lógica para manejar solicitudes relacionadas con autenticación.
const authController = require('../controllers/auth.controller');

const { authenticateToken, checkRole } = require('../middlewares/auth.middleware'); // Middlewares que se utilizan para autenticar tokens y para verificar los roles de los usuarios

const ROLES = require('../utils/constants');
// Ruta POST para manejar el inicio de sesión (login).
// Aquí se envía información como el email y la contraseña para autenticarse.
router.post('/auth/login', authController.login);

// Exportamos el enrutador para que pueda ser usado en otras partes de la aplicación.
module.exports = router;