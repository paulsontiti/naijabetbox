'use strict';
var express = require('express'),
router = express.Router(),
request = require('../models/fund_request'),
authObj = require('../models/auth'),
requests = null;

router.get('/',authObj.adminAuth,function(req,res){
	request.getAllFundRequest(function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			requests = fundRequest;
 				res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),request:requests});
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
	res.render('admin/fund_request',{title:'Fund request',errors:err,request:requests});
}else{
	var query = null;
	switch(searchTerm){
		case "username":
		query = {username:value};
		request.getAllFundRequest(query,function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			requests = fundRequest;
 				res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "betting company":
		query = {betting_company:value};
		request.getAllFundRequest(query,function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			requests = fundRequest;
 				res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "requested date":
		query = {request_date:value};
		request.getAllFundRequest(query,function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			requests = fundRequest;
 				res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		case "done":
		query = {done:value};
		request.getAllFundRequest(query,function(err,fundRequest){
		if(err){
			console.log(err);
		}else{
			requests = fundRequest;
 				res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),request:requests});
		}
	});
		break;
		default:{
			res.render('admin/fund_request',{title:'Fund request',csrfToken:req.csrfToken(),searchMsg:'Please select a search term',request:requests});
		}
	}
}
});

module.exports = router;