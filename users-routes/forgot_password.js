'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
hashPassword = require('../models/hash-password');
//get forgot_password page
router.get('/',function(req,res,next){
        res.render('forgot_password',{title:'Reset Password',csrfToken:req.csrfToken()});
    });

router.post('/change_password',function(req,res){
	//Get form values
	var username_email = req.body.username_email.toLowerCase(),
	password = req.body.password,
	confirm_password = req.body.confirm_password;
	//validate form values
 req.check('username_email','Username/email is required').notEmpty();
 req.check('password','Password is required').notEmpty();
 req.check('confirm_password','Password do not match').equals(password);


 //check for errors
 var err = req.validationErrors();
 if(err){
   res.render('forgot_password',{errors:err,title:'Reset password',username_email:username_email,csrfToken:req.csrfToken()});
 }else{
 	var query = {username:username_email}
 	User.getAUser(query,function(err,user){
 		if(err){
 			console.log(err);
 		}else{
 			if(user){
 				// hash the password
				var hash = hashPassword.saltHashPassword(password),
 				param = {password:hash.hashPassword,
	                         salt:hash.salt};
 				User.updateAUser(query,param,function(err){
 					if(err){
 						console.log(err);
 					}else{
 						res.redirect("/login");
 					}
 				});
 			}else{
 				query = {email:username_email};
 				User.getAUser(query,function(err,user){
 					if(err){
 						console.log(err);
 					}else{
 						if(user){
 							// hash the password
				var hash = hashPassword.saltHashPassword(password),
 				param = {password:hash.hashPassword,
	                         salt:hash.salt};
 				User.updateAUser(query,param,function(err){
 					if(err){
 						console.log(err);
 					}else{
 						res.redirect("/login");
 					}
 				});
 						}else{
 							res.render('forgot_password',{title:'Reset password',msg:"Invalid username or email",username_email:username_email,csrfToken:req.csrfToken()});
 						}
 					}
 				})
 			}

 		}
 	});

 }

});

module.exports = router;