"use strict"
var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/',function(req,res){
	console.log(req);
	User.getUserByUsername({username:req.params.username},function(err,users){
		if(err){
			console.log(err);
		}else{
			res.json(users);			
		}
	});
	
});

module.exports = router;