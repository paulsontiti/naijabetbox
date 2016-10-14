'use strict';
var express = require('express');
var router = express.Router();
var authObj = require('../models/auth');
var User = require('../models/user');
var withdrawRequest = require('../models/withdraw_request');
var _user = null;
//get users home page
router.get('/',authObj.auth,function(req,res,next){
		User.getUserByUsername(req.session.username,function(err,user){
			if(err){
				console.log(err);
			}else{
				_user = user;
			res.locals.user = user;
        res.render('withdraw_cash',{title:'Withdraw cash',csrfToken:req.csrfToken()});
    }
		});
});
router.post('/withdraw',function(req,res,next){
	//get form values
	var firstname = req.body.firstname,
	surname = req.body.surname,
	bank = req.body.bank,
	account_number = req.body.account_number,
    amount  = req.body.amount;
	//form validation
	req.check('firstname','First name is rquired').notEmpty();
	req.check('surname','Surname is rquired').notEmpty();
	req.check('account_number','Account number is rquired').notEmpty();
	req.check('amount','Amount is rquired').notEmpty();

	//check for errors
	var err = req.validationErrors();
	if(err){
		 res.locals.user = _user;
		res.render('withdraw_cash',{title:'Withdraw cash',errors:err,csrfToken:req.csrfToken()});
	}else if(bank === 'select your bank'){
		 res.locals.user = _user;
		res.render('withdraw_cash',{title:'Withdraw cash',msg:'Please select your bank',csrfToken:req.csrfToken()});
	}
	else{
		var balance = _user.balance,
		withdrawableBalance = _user.withdrawable_balance,
		username = _user.username,bonus = _user.bonus,total;
		if(withdrawableBalance < amount){
			 res.locals.user = _user;
		 res.render('withdraw_cash',{title:'Withdraw cash',msg:'Insuficient balance.Please credit your account!!',csrfToken:req.csrfToken()});
		}else{
			balance = withdrawableBalance - amount;
			total = balance + bonus;
			withdrawableBalance = balance - (balance * 0.025);
			var updateParams = {
				balance:balance,
				total_balance:total,
				withdrawable_balance:withdrawableBalance
			};
			User.updateAUser(username,updateParams,function(err,user){
               if(err){
               	console.log(err);
               }else{
               	User.getUserByUsername(username,function(err,user){
               	res.locals.user = user;
               	_user = user;
               	var request = new withdrawRequest({
               		firstname:firstname,
               		surname:surname,
               		bank:bank,
               		account_number:account_number,
               		amount:amount
               	});
               	withdrawRequest.createWithdrawRequest(request,function(err,withdraw_request){
               		if(err){
               			console.log(err);
               		}else{
 							res.locals.user = _user;
               				res.render('withdraw_cash',{title:'Withdraw cash',confirmMsg:'Your request has been recieved.Your bank account will be credited in two working days',csrfToken:req.csrfToken()});
               		}
               	});
               	});
               }
			});
		}
	}
});

module.exports = router;