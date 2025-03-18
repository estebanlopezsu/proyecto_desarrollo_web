// Importamos Express, una biblioteca para construir aplicaciones web en Node.js.
const express = require('express');

// Creamos un enrutador que nos permite manejar rutas de forma modular.
const router = express.Router();

// Importamos el controlador del proyecto, que contiene la lógica para manejar las solicitudes relacionadas con proyectos.
const authController = require('../controllers/project.controller'); // NOTA: El nombre "authController" parece no coincidir con "project.controller". Quizás quieras cambiarlo a "projectController" para mayor claridad.

// Exportamos el enrutador para que pueda ser utilizado en otras partes de la aplicación.
module.exports = router;