const express = require('express');
const Post = require('../model/postModel');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const globalController = require('../controller/globalController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
    .route('/')
    .get(postController.getAllPosts)
    .post(
        authController.protectRoute, 
        authController.restrictRoute('creator'), 
        globalController.addParams, 
        postController.createPost
        );

//protects all the below routes from un-authenticated req
router.use(authController.protectRoute);

router
    .route('/:id')
    .get(postController.getPost)
    .patch( 
        authController.checkCreator(Post),
        postController.updatePost
        )
    .delete(
        authController.checkCreator(Post),
        postController.deletePost
        );


module.exports = router;