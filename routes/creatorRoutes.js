const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);


/* Admin related ROUTES

router
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

*/
module.exports = router;