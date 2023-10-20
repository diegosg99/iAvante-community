const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');

router.post('/like', likeController.like);

router.post('/unlike', likeController.unlike);

router.post('/get/likes', likeController.getLikes);



module.exports = router;