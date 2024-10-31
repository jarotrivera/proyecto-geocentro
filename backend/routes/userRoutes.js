const express = require('express');
const { registerUser, loginUser, getPosts } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener todas las publicaciones
router.get('/posts', getPosts);

module.exports = router;
