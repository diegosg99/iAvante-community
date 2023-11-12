const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');

// ------------------------------------------- User Routes -----------------------------------------------------

router.get('/get/events', eventsController.getEvents);

router.post('/upload/event', eventsController.uploadEvent);

router.post('/remove/event', eventsController.removeEvent);

module.exports = router;