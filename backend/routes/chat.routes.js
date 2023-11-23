const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/new/lobby', chatController.newLobby);

router.post('/get/lobby', chatController.getLobby);

router.get('/get/lobbys/:uid', chatController.getUserLobbys);

router.post('/send/message', chatController.sendMessage);

router.get('/get/lobby/data/:id', chatController.getLobbyData);

module.exports = router;