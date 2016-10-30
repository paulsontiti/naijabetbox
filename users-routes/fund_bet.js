'use strict';
var express = require('express');
var router = express.Router();
var authObj = require('../models/auth');
var User = require('../models/user');
var FundRequest = require('../models/fund_request');
var _user = null;
//get users home page
router.get('/',authObj.auth,function(req,res,next){
        User.getAUser({username:req.session.username},function(err,user){
			if(err){
				console.log(err);
			}else{
        _user = user;
			res.locals.user = user;
        res.render('fund_bet',{title:'Fund bet',csrfToken:req.csrfToken()});
    }
		});
});
router.post('/fund_bet',function(req,res){
	//get form values
	var bettingUsername = req.body.username,
	bettingCompany = req.body.bet_company,
	amount = req.body.amount;
	// validate form
	req.check('username','Username is required').notEmpty();
	req.check('amount','Amount is required').notEmpty();
	req.check('amount','Amount must be digits').isInt();
	//check for errors
   var err = req.validationErrors();
   if(err){
     res.locals.user = _user;
   	res.render('fund_bet',{errors:err,title:'Fund bet',csrfToken:req.csrfToken()});
   }else if(bettingCompany === 'select your betting company'){
     res.locals.user = _user;
    res.render('fund_bet',{title:'Fund bet',msg:'Please select a betting company',csrfToken:req.csrfToken()});
   }
   else{
         var total = bettingCompany === 'Nairabet' ? _user.balance : _user.total_balance,
        username = _user.username,balance = _user.balance,bonus = _user.bonus;
        if(total < amount){
           res.locals.user = _user;
            res.render('fund_bet',{title:'Fund bet',msg:'Insuficient balance!!.Please credit your Naijabetbox account and try agiain.\nNote that we do not give bonus for Nairabet',csrfToken:req.csrfToken()});
       }else{
              var balance = amount > balance ? 0 : (balance - amount);
              var total = amount > balance ? total - amount : (bonus + balance);
              var bonus = amount > balance ? total - balance : bonus;
              var withdrawableBalance = amount > balance ? 0 : balance - balance * 0.025;
              var updateParams = {
                balance:balance,
                total_balance:total,
                bonus:bonus,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser({username:username},updateParams,function(err,result){
                       if(err){
                        console.log(err);
                       }else{
                            User.getAUser({username:username},function(err,user){
                              _user = user;
                            res.locals.user = user;
                            var request = new FundRequest();
                            request.username = bettingUsername;
                            request.betting_company = bettingCompany;
                            request.amount = amount;
                             FundRequest.createFundRequest(request,function(err,fundRequest){
                                if(err){
                                  console.log(err);
                                   res.locals.user = _user;
                                  res.render('fund_bet',{title:'Fund bet',msg:'Something bad happened',csrfToken:req.csrfToken()});
                                }else{
                                   res.locals.user = _user;
                                 res.render('fund_bet',{title:'Fund bet',confirmMsg:'Your request has been sent',csrfToken:req.csrfToken()});
                                }
                            });
                          });
                        }
            });
            }
     }
});
module.exports = router;