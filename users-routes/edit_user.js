'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authObj = require('../models/auth');
var _user = null;

/* GET edit_user page. */
router.get('/',authObj.auth,function(req, res, next) {
	User.getUserByUsername(req.session.username,function(err,user){
		if(err){
			console.log(err);
		}else{
			_user = user;
			res.locals.user = user;
   	 		res.render('edit_user',{title:'Update',csrfToken:req.csrfToken()});
		}
	});
});
router.post('/update',function(req,res,next){
		//Get form values
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var username = req.body.username;
	var email = req.body.email;
	var phone_number = req.body.phone_number;
	var alternate_phone_number = req.body.alternate_phone_number;

 //form validation
 req.check('firstname','First name is required').notEmpty();
 req.check('lastname','Last name is required').notEmpty();
 req.check('username','Username is required').notEmpty();
 req.check('phone_number','Phone number is required').notEmpty();
 req.check('username','Username should be min of 6 and max of 20').isLength({min:6,max:20});
 req.check('email','Email is required').notEmpty();
 req.check('email','Invalid email').isEmail();

 //check for errors
 var err = req.validationErrors();
 if(err){
 	 res.locals.user = _user;
   res.render('edit_user',{errors:err,title:'Update',csrfToken:req.csrfToken()});
 }else{
 	var updateParams = {
 			firstname:firstname,
 			lastname:lastname,
 			username:username,
 			email:email,
 			phone_number:phone_number,
 			alternate_phone_number:alternate_phone_number
 	};
 	User.updateAUser(req.session.username,updateParams,function(err,user){
               if(err){
               	if(err.code === 11000){
               		res.locals.user = _user;
               		res.render('edit_user',{title:'Edit user',msg:'username already in use.Try another',csrfToken:req.csrfToken()});
               	}
               }else{
               	res.redirect('/dashboard');
               }
           });
 }
});

module.exports = router;