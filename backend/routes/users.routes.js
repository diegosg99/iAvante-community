const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const {helperImg} = require("../services/imageOptimizer");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: './backend/uploads/images',
    filename: (req,file,cb) => {
        const ext = file.originalname
        cb(null,`${ext}`)
    }
})

const IMAGE_TYPES = {
    PROFILE: 'profile',
    POST: 'post'
}

const upload = multer({storage});

// Ruta para obtener todos los usuarios
router.post('/user/login', usersController.loginUser);

router.post('/user/verifyToken', usersController.verifyToken);


// Ruta para obtener todos los usuarios
router.post('/user/register', usersController.registerUser);

// Ruta para obtener todos los usuarios
router.get('/users', usersController.getAllUsers);

// Ruta para actualizar un usuario
router.put('/user/update', usersController.updateUser);

// Ruta para actualizar un usuario
// router.get('/user/profile/image/:id', usersController.getProfileImage);

// Ruta para obtener un usuario por su ID
router.get('/user/:uid', usersController.getUserById);

// Ruta para obtener un usuario por su ID
router.get('/user/email/:email', usersController.getUserByEmail);

// Ruta para obtener un usuario por su ID
router.post('/upload/image',upload.single('file'), usersController.uploadImage);

module.exports = router;