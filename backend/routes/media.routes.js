const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');


// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/get/media/profile', mediaController.getProfilePicture);

module.exports = router;