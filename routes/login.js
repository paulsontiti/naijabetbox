'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var hashPassword = require('../models/hash-password');
/* GET login page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Login',csrfToken:req.csrfToken()});
});

router.get('/logout',function(req,res,next){
req.session.username = null;
res.redirect('/');
});

router.post('/login', function(req, res, next) {
	//get form values
	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	//validate form values
	req.check('username','username is required').notEmpty();
	req.check('password','password is required').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render('login',{title:'Login',errors:errors,csrfToken:req.csrfToken()});
	}else{
       
  User.getAUser({username:username},function(err,user){
    if(err){
    	console.log(err);
    }else if(user === null){
    	var errors = [{msg:'username and password do not match'}];
    	res.render('login',{title:'Login',errors:errors,csrfToken:req.csrfToken()});
    }
    else{
    	var result = hashPassword.confirmPassword(user,password);
    	if(result){
                req.session.username = user.username;
                req.session.isAdmin = user.isAdmin;
                res.locals.user = user;
                res.redirect('/dashboard');			
    	}else{
    		var errors = [{msg:'username and password do not match'}];
    		res.render('login',{title:'Login',errors:errors,csrfToken:req.csrfToken()});
    	}
    }
  })
	}
});
module.exports = router;
