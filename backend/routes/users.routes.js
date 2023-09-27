const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const multer = require("multer");
const tools = require("../services/tools.service");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        let path = tools.mediaManager(file);
        cb(null,path)
    },
    filename: (req,file,cb) => {
        const ext = file.originalname;
        console.log(ext);
        cb(null,`${ext}`)
    }
})

const upload = multer({storage});


// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/user/login', usersController.loginUser);

router.post('/user/verifyToken', usersController.verifyToken);

router.post('/user/register',upload.single('file'), usersController.registerUser);

router.get('/users', usersController.getAllUsers);

router.post('/user/update', usersController.updateUser);

router.get('/user/:uid', usersController.getUserById);

router.get('/user/email/:email', usersController.getUserByEmail);

router.post('/upload/image',upload.single('file'), usersController.uploadImage);

module.exports = router;