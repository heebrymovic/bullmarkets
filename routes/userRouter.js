const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// Routes for user registration and login
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Routes for Facebook registration and login
router.get('/auth/facebook', userController.registerUserFacebook);
router.get('/auth/facebook/callback', userController.registerUserFacebookCallback);
router.get('/auth/facebook/login', userController.loginUserFacebook);
router.get('/auth/facebook/login/callback', userController.loginUserFacebookCallback);

// Routes for Google registration and login
router.get('/auth/google', userController.registerUserGoogle);
router.get('/auth/google/callback', userController.registerUserGoogleCallback);
router.get('/auth/google/login', userController.loginUserGoogle);
router.get('/auth/google/login/callback', userController.loginUserGoogleCallback);

// Routes for user CRUD operations
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
