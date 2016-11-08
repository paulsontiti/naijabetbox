'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
authObj = require('../models/auth');

/* GET credit_account page. */
router.get('/',authObj.adminAuth,function(req, res, next) {
   	res.render('admin/credit_account',{title:'Credit account',username:req.query.username,csrfToken:req.csrfToken()});
});

router.post('/credit_account',function(req,res,next){
  //get form values
  var amount = req.body.amount;
  //form validation
  req.check('amount','Amount is required').notEmpty();
  //check for errors
  var err = req.validationErrors();
  if(err){
  		res.render('admin/credit_account',{title:'Credit account',errors:err,csrfToken:req.csrfToken()});
  }else{
  		User.creditAccount(req.query.username,amount,function(err,result){
  			if(err){
  				console.log(err);
  			}else{
  				res.redirect('/admin/user');
  			}
  		});
  }
});

module.exports = router;