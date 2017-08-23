/**
 * Created by syedkazmi on 22/08/2017.
 */

const express = require('express');
const router = express.Router();
const {createUser: register} = require('../controllers/users');

// users
router
    .route('/users')
    .post(register);


module.exports = router;