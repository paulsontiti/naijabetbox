'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var hashPassword = require('../models/hash-password');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign up',csrfToken:req.csrfToken() });
});
router.post('/sign-up',function(req,res,next){
		//Get form values
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var phone_number = req.body.phone_number;
	var alternate_phone_number = req.body.alternate_phone_number;
	var confirmPassword = req.body.confirmPassword;

 //form validation
 req.check('firstname','First name is required').notEmpty();
 req.check('lastname','Last name is required').notEmpty();
 req.check('username','Username is required').notEmpty();
 req.check('phone_number','Phone number is required').notEmpty();
 req.check('username','Username should be min of 6 and max of 20').isLength({min:6,max:20});
 req.check('email','Email is required').notEmpty();
 req.check('email','Invalid email').isEmail();
 req.check('password','Password is required').notEmpty();
 req.check('confirmPassword','Password do not match').equals(password);

// hash the password
var hash = hashPassword.saltHashPassword(password);
//create a user
var newuser = new User({
	firstname:firstname,
	lastname:lastname,
	email:email,
	username:username,
	phone_number:phone_number,
	alternate_phone_number:alternate_phone_number,
	password:hash.hashPassword,
	salt:hash.salt
});
 //check for errors
 var err = req.validationErrors();
 if(err){
 	res.locals.userSignUp = newuser;
   res.render('signup',{errors:err,title:'Sign up',csrfToken:req.csrfToken()});
 }else{

User.createUser(newuser,function(err,user){
	if(err){
		if(err.code === 11000){
 	res.locals.userSignUp = newuser;
	      	res.render('signup',{title:'Sign up',msg:'username already in use.Try another',csrfToken:req.csrfToken()});
	    }
    }else{
    	res.redirect('/login');
      }
	});
}
});

module.exports = router;