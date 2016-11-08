'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
authObj = require('../models/auth');
router.get('/',authObj.adminAuth,function(req,res){
	User.getAllUsers(function(err,user){
      if(err){
      	console.log(err);
      }else{
      	res.locals.users = user;
         res.render('admin/user',{csrfToken:req.csrfToken()});
      }
	});
});
router.post('/user',function(req,res){
   if(req.body.username){
      User.getAUser({username:req.body.username},function(err,user){
         if(err){
         console.log(err);
      }
      if(user){
         res.locals.user = user;
         res.render('admin/user',{csrfToken:req.csrfToken()});
      }else{
         res.render('admin/user',{msg:"No user found",csrfToken:req.csrfToken()});
      }
      });
   }else{
      res.render('admin/user',{errMsg:"Please provide a username",csrfToken:req.csrfToken()});
   }
});

module.exports = router;