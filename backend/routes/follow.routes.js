const express = require('express');
const router = express.Router();
const followController = require('../controllers/follow.controller');


// ------------------------------------------- User Routes -----------------------------------------------------

router.post('/follow', followController.follow);

router.post('/unfollow', followController.unfollow);

router.post('/follow/check', followController.checkFollow);

router.post('/get/follows', followController.getFollows);
router.post('/get/follows/data', followController.getFollowsData);

router.post('/get/followers', followController.getFollowers);
router.post('/get/followers/data', followController.getFollowersData);


module.exports = router;