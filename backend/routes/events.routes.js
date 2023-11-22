const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const multer = require("multer");
const tools = require("../services/tools.service");

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log('storage file:');
        let path = tools.mediaManager(file);
        cb(null,path)
    },
    filename: (req,file,cb) => {
        const ext = file.originalname;
        cb(null,`${ext}`)
    }
})

const upload = multer({storage});

// ------------------------------------------- User Routes -----------------------------------------------------

router.get('/get/events', eventsController.getEvents);

router.get('/get/event/:id', eventsController.getEvent);

router.post('/upload/event', eventsController.uploadEvent);

router.post('/remove/event', eventsController.removeEvent);

router.post('/event/sub', eventsController.subscribeEvent);

router.post('/event/unsub', eventsController.unsubscribeEvent);

router.post('/event/people/subscribed', eventsController.getPeopleSubscribed);

router.post('/event/isSubbed', eventsController.isSubbed);

router.post('/event/upload/media',upload.array('files'), eventsController.uploadEventMedia);

module.exports = router;