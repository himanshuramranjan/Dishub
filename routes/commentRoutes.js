const express = require('express');

const commentController = require('../controller/commentController');
const authController = require('../controller/authController');
const creatorController = require('../controller/creatorController');

const router = express.Router();


router
    .route('/')
    .get(commentController.getAllComments)
    .post(authController.protectRoute,
          authController.restrictRoute('creator'), 
          creatorController.getCurrentCreator,
          commentController.createComment);

router
    .route('/:id')
    .get(commentController.getComment)
    .patch(
        authController.protectRoute, 
        commentController.updateComment
        )
    .delete(
        authController.protectRoute, 
        commentController.deleteComment
        );

module.exports = router;
