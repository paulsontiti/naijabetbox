'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
authObj = require('../models/auth');

router.get('/',authObj.auth,function(req,res){
	User.getAUser({username:req.session.username},function(err,user){
		if(err){
			console.log(err);
		}else{
			res.locals.user = user;
   	 		res.render('dashboard',{title:'Dashboard'});
		}
	});
});

module.exports = router;