const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');


// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/get/media/profile', mediaController.getProfilePicture);
router.post('/get/media/post', mediaController.getMediaPost);

module.exports = router;