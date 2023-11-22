const express = require('express');
const router = express.Router();
const stateController = require('../controllers/state.controller');

// ------------------------------------------- State Routes -----------------------------------------------------

router.post('/change/status',stateController.changeStatus);

router.get('/get/status',stateController.getStatus);

module.exports = router;