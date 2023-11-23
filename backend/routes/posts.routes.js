const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const multer = require("multer");
const tools = require("../services/tools.service");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log('storage file:');
        console.log(file);
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

router.post('/post/upload', postController.uploadPost);
router.post('/post/upload/media',upload.array('files'), postController.uploadPostMedia);
router.post('/get/followed/posts', postController.getFollowedPosts);
router.post('/get/post', postController.getPost);
router.post('/user/posts', postController.getUserPosts);
router.post('/delete/post', postController.deleteUserPost);

module.exports = router;