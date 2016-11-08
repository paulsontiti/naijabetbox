'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
authObj = require('../models/auth'),
_user = null;

/* GET edit_user page. */
router.get('/',authObj.auth,function(req, res, next) {
	User.getAUser({username:req.session.username},function(err,user){
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
	var firstname = req.body.firstname,
	lastname = req.body.lastname,
	username = req.body.username,
	email = req.body.email,
	phone_number = req.body.phone_number,
	alternate_phone_number = req.body.alternate_phone_number;

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
		 	User.updateAUser({username:req.session.username},updateParams,function(err,user){
		               if(err){
		               	if(err.code){
		 				res.locals.user = _user;
		 				res.locals.user.username = username;
			            res.render('edit_user',{title:'Update',msg:'username already in use.Try another',csrfToken:req.csrfToken()});
		 			}
		               }else{
		               	req.session.username = username;
		               	res.redirect('/dashboard');
		               }
		    });
 
	 	}
});

module.exports = router;