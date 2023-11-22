const express = require('express');
const router = express.Router();
const stateController = require('../controllers/state.controller');

// ------------------------------------------- State Routes -----------------------------------------------------

router.post('/set/status',stateController.setStatus);

router.post('/get/status',stateController.getStatus);

module.exports = router;