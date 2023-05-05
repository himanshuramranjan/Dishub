const express = require('express');
const authController = require('../controller/authController');
const creatorController = require('../controller/creatorController');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);


// Admin Accessible ROUTES

router
    .route('/')
    .get(creatorController.getAllCreators)
    .post(creatorController.createCreator);

router
    .route('/:id')
    .get(creatorController.getCreator)
    .patch(creatorController.updateCreator)
    .delete(creatorController.deleteCreator);


module.exports = router;