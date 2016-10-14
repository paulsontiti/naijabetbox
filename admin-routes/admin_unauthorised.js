'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session.username);
	User.getUserByUsername(req.session.username,function(err,user){
		if(err){
			console.log(err);
		}else{
			res.locals.user = user;
   	 		res.render('admin_unauthorised', { title: 'Access denied'});
		}
	});
});

module.exports = router;