'use strict';
var express = require('express');
var router = express.Router();
var request = require('../models/withdraw_request');
var authObj = require('../models/auth');

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllWithdrawRequest(function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			if(withdrawRequest.length > 0){
 				res.render('admin/withdraw_request',{title:'Withdraw request',request:withdrawRequest});
			}else{
 				res.render('admin/withdraw_request',{title:'Withdraw request'});
			}
		}
	});
});

module.exports = router;