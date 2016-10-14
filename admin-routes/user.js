'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authObj = require('../models/auth');
router.get('/',authObj.adminAuth,function(req,res){
	User.getAllUsers(function(err,user){
      if(err){
      	console.log(err);
      }
      if(user){
         res.locals.users = user;
         res.render('admin/user');
      }else{
      	res.render('admin/user');
      }
	});
});

module.exports = router;