"use strict"
var express = require('express');
var router = express.Router();
var User = require('./models/user');

router.post('/login',function(req,res){
	res.json(req.body);
});

module.exports = router;
