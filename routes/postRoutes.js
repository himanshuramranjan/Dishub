const express = require('express');
const postController = require('../controller/postController');
const authController = require('../controller/authController');
const creatorController = require('../controller/creatorController');

const router = express.Router();

router
    .route('/')
    .get(postController.getAllPosts)
    .post(authController.protectRoute, creatorController.getCurrentCreator, postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);


module.exports = router;