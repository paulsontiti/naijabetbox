'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authObj = require('../models/auth');

router.get('/',authObj.auth,function(req,res){
	User.getUserByUsername(req.session.username,function(err,user){
		if(err){
			console.log(err);
		}else{
			res.locals.user = user;
   	 		res.render('dashboard',{title:'Dashboard'});
		}
	});
});

module.exports = router;