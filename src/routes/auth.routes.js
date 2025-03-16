const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

// post para poder probar enviando informacion, en este caso email y contraseña
router.post('/auth/login', authController.login);

module.exports = router;