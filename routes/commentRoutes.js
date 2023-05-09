const express = require('express');

const commentController = require('../controller/commentController');
const authController = require('../controller/authController');

const router = express.Router();


router
    .route('/')
    .get(commentController.getAllComments)
    .post(authController.protectRoute,
          authController.restrictRoute('creator'), 
          commentController.addParam,
          commentController.createComment);

router
    .route('/:id')
    .get(commentController.getComment)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment);

module.exports = router;
