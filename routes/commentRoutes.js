const express = require('express');
const Comment = require('../model/commentModel');
const commentController = require('../controller/commentController');
const authController = require('../controller/authController');
const globalController = require('../controller/globalController');

const router = express.Router({ mergeParams: true});


router
    .route('/')
    .get(commentController.getAllComments)
    .post(authController.protectRoute,
          authController.restrictRoute('creator'), 
          globalController.addParams,
          commentController.createComment);

//protects all the below routes from un-authenticated req
router.use(authController.protectRoute);

router
    .route('/:id')
    .get(commentController.getComment)
    .patch( 
        authController.checkCreator(Comment),
        commentController.updateComment
        )
    .delete(
        authController.checkCreator(Comment),
        commentController.deleteComment
        );

module.exports = router;
