const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const questionController = require('../controllers/questions.controller');
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


// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/user/login', usersController.loginUser);

router.post('/user/verifyToken', usersController.verifyToken);

router.post('/user/register', usersController.registerUser);

router.get('/users', usersController.getAllUsers);

router.put('/user/update', usersController.updateUser);

router.get('/user/:uid', usersController.getUserById);

router.get('/user/email/:email', usersController.getUserByEmail);

router.post('/upload/image',upload.single('file'), usersController.uploadImage);

module.exports = router;