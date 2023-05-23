const express = require('express');
const Post = require('../model/postModel');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const creatorController = require('../controller/creatorController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
    .route('/')
    .get(postController.getAllPosts)
    .post(
        authController.protectRoute, 
        authController.restrictRoute('creator'), 
        creatorController.getCurrentCreator, 
        postController.createPost
        );

router
    .route('/:id')
    .get(postController.getPost)
    .patch(
        authController.protectRoute, 
        authController.checkCreator(Post),
        postController.updatePost
        )
    .delete(
        authController.protectRoute, 
        authController.checkCreator(Post),
        postController.deletePost
        );


module.exports = router;