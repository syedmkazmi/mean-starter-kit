var express = require('express');
var router = express.Router();
var {getHomePage: homeCtrl} = require('../controllers/main');

/* GET home page. */
router.get('/', homeCtrl);

module.exports = router;
