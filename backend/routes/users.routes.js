const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Ruta para obtener todos los usuarios
router.post('/user/login', usersController.loginUser);

router.post('/user/verifyToken', usersController.verifyToken);


// Ruta para obtener todos los usuarios
router.post('/user/register', usersController.registerUser);

// Ruta para obtener todos los usuarios
router.get('/users', usersController.getAllUsers);

// Ruta para actualizar un usuario
router.put('/user/update', usersController.updateUser);

// Ruta para obtener un usuario por su ID
router.get('/user/:uid', usersController.getUserById);

module.exports = router;