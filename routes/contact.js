'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.getUserByUsername(req.session.username,function(err,user){
      if(err){
        console.log(err);
      }else{
      res.locals.user = user;
        res.render('contact',{title:'Contact us',csrfToken:req.csrfToken()});
    }
    });
});
router.post('/send',function(req,res,next){
	//Get form values
	var username = req.body.username;
	var email = req.body.email;
	var subject = req.body.subject;
	var phone = req.body.phonenumber;
	var message = req.body.message;

 //form validation
 req.check('username','Username is required').notEmpty();
 req.check('email','Email is required').notEmpty();
 req.check('email','Invalid email').isEmail();
 req.check('subject','Subject is required').notEmpty();
 req.check('phonenumber','Phone number is required').notEmpty();

 //check for errors
 var err = req.validationErrors();
 if(err){
   res.render('contact',{errors:err,title:'Contact us',csrfToken:req.csrfToken()});
 }else if(message.length === 1){
 	res.render('contact',{title:'Contact us',msg:'Message is required',csrfToken:req.csrfToken()});
 }
 else{
			var transporter = nodemailer.createTransport({
					service:'Gmail',
					auth: {
						user:'titidprogrammer@gmail.com',
						pass:'titile1987'
					}
			});
			var mailOptions = {
				from:username + '<'+email+'>',
				to:'evatelmedia@gmail.com',
				subject:subject,
				html:'<p>A user contacted you with the following details....</p><ul><li>Username: '+username+'</li><li>Email: '+email+'</li><li>Phone number: '+phone+'</li><li>Message: '+message+'</li></ul>'
			}
			transporter.sendMail(mailOptions,function(err,info){
			if(err){
				console.log(err);
			}else{
				res.render('contact',{title:'Contact us',confirmMsg:'Thank you for contacting us',csrfToken:req.csrfToken()});
			}
			})
}
});

module.exports = router;