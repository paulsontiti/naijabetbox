'use strict';
var express = require('express');
var router = express.Router();
//get users home page
router.get('/users-views/index',function(req,res,next){
 res.render('index');
});
module.exports = router;