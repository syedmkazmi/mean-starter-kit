/**
 * Created by syedkazmi on 22/08/2017.
 */

const express = require('express');
const router = express.Router();
const {getAllUsers: findUser} = require('../controllers/users');
const {register: registerUser, login: loginUser} = require('../controllers/authentication');

// users
router
    .route('/users')
    .get(findUser);

// registration
router
    .route('/register')
    .post(registerUser);

// login
router
    .route('/login')
    .post(loginUser);

module.exports = router;