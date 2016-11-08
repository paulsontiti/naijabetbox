'use strict';
var express = require('express'),
router = express.Router(),
request = require('../models/withdraw_request'),
authObj = require('../models/auth'),
requests = null;

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllWithdrawRequest(function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
});

router.post('/search',function(req,res){
//get form values
var searchTerm = req.body.searchTerm,
value = req.body.searchValue;
//validate form
req.check('searchValue','Field is required').notEmpty();
//check for errors
var err = req.validationErrors();
if(err){
	res.render('admin/withdraw_request',{title:'Withdraw request',errors:err,request:requests});
}else{
	var query = null;
	switch(searchTerm){
		case "bank":
		query = {bank:value};
		request.getAllWithdrawRequest(query,function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "requested date":
		query = {request_date:value};
		request.getAllWithdrawRequest(query,function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "done":
		query = {done:value};
		request.getAllWithdrawRequest(query,function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "amount":
		query = {amount:value};
		request.getAllWithdrawRequest(query,function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "account number":
		query = {account_number:value};
		request.getAllWithdrawRequest(query,function(err,withdrawRequest){
		if(err){
			console.log(err);
		}else{
			requests = withdrawRequest;
 				res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		default:{
			res.render('admin/withdraw_request',{title:'Withdraw request',csrfToken:req.csrfToken(),searchMsg:'Please select a search term',request:requests});
		}
	}
}
});

module.exports = router;