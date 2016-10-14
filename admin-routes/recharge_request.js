'use strict';
var express = require('express');
var router = express.Router();
var request = require('../models/recharge_request');
var authObj = require('../models/auth');

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllRechargeRequest(function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			if(rechargeRequest.length > 0){
 				res.render('admin/recharge_request',{title:'Recharge request',request:rechargeRequest});
			}else{
 				res.render('admin/recharge_request',{title:'Recharge request'});
			}
		}
	});
});

module.exports = router;