'use strict';
var express = require('express');
var router = express.Router();
var authObj = require('../models/auth');
var User = require('../models/user');
var RechargeRequest = require('../models/recharge_request');
var _user = null;
//get users home page
router.get('/',authObj.auth,function(req,res,next){
       User.getUserByUsername(req.session.username,function(err,user){
      if(err){
        console.log(err);
      }else{
        _user = user;
      res.locals.user = user;
        res.render('buy_airtime',{title:'Buy airtime',csrfToken:req.csrfToken()});
    }
    });
});

router.post('/recharge',function(req,res){
      res.locals.user = _user;
   //get form values
   var network = req.body.network;
   var phone_number = req.body.phone_number;
   var amount = req.body.amount;
   //form validation
   req.check('phone_number','Phone number required').notEmpty();
   req.check('amount','Amount required').notEmpty();
   //check for errors
   var err = req.validationErrors();
   if(err){
   	res.render('buy_airtime',{errors:err,title:"Buy airtime",csrfToken:req.csrfToken()});
   }else if(network === 'select a network'){
     res.locals.user = _user;
    res.render('buy_airtime',{title:'Buy airtime',msg:'Please select a network',csrfToken:req.csrfToken()});
   }
   else{
    var balance = _user.balance,
        username = _user.username,bonus = _user.bonus,total,withdrawableBalance;
        if(balance < amount){
           res.locals.user = _user;
            res.render('buy_airtime',{title:'Buy airtime',msg:'Insuficient balance!!',csrfToken:req.csrfToken()});
       }else{
              balance -= amount;
              total = balance + bonus;
              withdrawableBalance = balance - balance * 0.025;
              var updateParams = {
                balance:balance,
                total_balance:total,
                withdrawable_balance:withdrawableBalance
              };
              User.updateAUser(username,updateParams,function(err){
                       if(err){
                        console.log(err);
                       }else{
                            var request = new RechargeRequest();
                            request.network = network;
                            request.phone_number = phone_number;
                            request.amount = amount;
                            request.username = username;
                             RechargeRequest.createRechargeRequest(request,function(err,rechargeRequest){
                                if(err){
                                  console.log(err);
                                          res.locals.user = _user;
                                  res.render('buy_airtime',{title:'Buy airtime',msg:'Something bad happened',csrfToken:req.csrfToken()});
                                }else{
                                User.getUserByUsername(username,function(err,user){
                                          _user = user;
                                          res.locals.user = user;
                                 res.render('buy_airtime',{title:'Buy airtime',confirmMsg:'Your request has been sent',csrfToken:req.csrfToken()});
                                });
                                }

                              });
                           }
   });
            }
          }
 });
       

module.exports = router;