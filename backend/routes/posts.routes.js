const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const tools = require("../services/tools.service");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log(file.originalname);
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

// router.post('/user/login', postController.loginUser);

// router.post('/user/verifyToken', postController.verifyToken);

router.post('/post/upload',upload.array('files'), postController.uploadPost);

module.exports = router;