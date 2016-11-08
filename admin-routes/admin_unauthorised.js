'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	User.getAUser({username:req.session.username},function(err,user){
		if(err){
			console.log(err);
		}else{
			res.locals.user = user;
   	 		res.render('admin_unauthorised', { title: 'Access denied'});
		}
	});
});

module.exports = router;