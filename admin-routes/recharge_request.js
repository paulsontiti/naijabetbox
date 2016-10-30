'use strict';
var express = require('express');
var router = express.Router();
var request = require('../models/recharge_request');
var authObj = require('../models/auth');
var requests = null;

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllRechargeRequest(function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
});

router.post('/search',function(req,res){
//get form values
var searchTerm = req.body.searchTerm;
var value = req.body.searchValue;
//validate form
req.check('searchValue','Field is required').notEmpty();
//check for errors
var err = req.validationErrors();
if(err){
	res.render('admin/recharge_request',{title:'Recharge request',errors:err,request:requests});
}else{
	var query = null;
	switch(searchTerm){
		case "username":
		query = {username:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "network":
		query = {network:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "requested date":
		query = {request_date:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "done":
		query = {done:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "amount":
		query = {amount:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "phone number":
		query = {phone_number:value};
		request.getAllRechargeRequest(query,function(err,rechargeRequest){
		if(err){
			console.log(err);
		}else{
			requests = rechargeRequest;
 				res.render('admin/recharge_request',{title:'recharge request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		default:{
			res.render('admin/recharge_request',{title:'Recharge request',csrfToken:req.csrfToken(),searchMsg:'Please select a search term',request:requests});
		}
	}
}
});

module.exports = router;