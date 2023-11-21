const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');

// ------------------------------------------- User Routes -----------------------------------------------------

router.get('/get/events', eventsController.getEvents);

router.get('/get/event/:id', eventsController.getEvent);

router.post('/upload/event', eventsController.uploadEvent);

router.post('/remove/event', eventsController.removeEvent);

router.post('/event/sub', eventsController.subscribeEvent);

router.post('/event/unsub', eventsController.unsubscribeEvent);

router.post('/event/people/subscribed', eventsController.getPeopleSubscribed);

router.post('/event/isSubbed', eventsController.isSubbed);

module.exports = router;