'use strict';
var express = require('express');
var router = express.Router();
var request = require('../models/fund_request');
var authObj = require('../models/auth');

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllFundRequest(function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			if(fundRequest.length > 0){
 				res.render('admin/fund_request',{title:'Fund request',request:fundRequest});
			}else{
 				res.render('admin/fund_request',{title:'Fund request'});
			}
		}
	});
});

module.exports = router;