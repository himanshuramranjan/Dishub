const express = require('express');
const authController = require('../controller/authController');
const creatorController = require('../controller/creatorController');


const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);





//protects all the below routes from un-authenticated req
router.use(authController.protectRoute);

router.patch('/updatePassword', authController.updatePassword);

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