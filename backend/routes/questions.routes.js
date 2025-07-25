const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions.controller');

// ------------------------------------------- Questions Routes -----------------------------------------------------

router.post('/upload/question',questionController.uploadQuestion);
router.get('/get/questions',questionController.getAllQuestions);
router.get('/get/questions/:category',questionController.getCategoryQuestions);
router.post('/questions/update/views',questionController.updateViews);
router.post('/questions/comments',questionController.getQuestionComments);
router.post('/post/comments',questionController.getPostComments);
// router.post('/questions/new',questionController.newComment);
router.get('/get/question/:id',questionController.getQuestion);
router.post('/upload/comment',questionController.newComment);
router.post('/get/user/questions',questionController.getUserQuestions);
router.post('/get/user/responses',questionController.getUserResponses);
router.post('/delete/question',questionController.deleteUserQuestion);
router.post('/delete/response',questionController.deleteUserResponse);

module.exports = router;