const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/new/lobby', chatController.newLobby);

router.post('/get/lobby', chatController.getLobby);

router.post('/send/message', chatController.sendMessage);

module.exports = router;