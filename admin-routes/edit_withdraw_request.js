'use strict';
var express = require('express'),
router = express.Router(),
request = require('../models/withdraw_request'),
authObj = require('../models/auth');

/* GET credit_account page. */
router.get('/',authObj.adminAuth,function(req, res, next) {
   	res.render('admin/edit_withdraw_request',{title:'Edit withdrawal request',id:req.query.id,done:req.query.done,csrfToken:req.csrfToken()});
});

router.post('/edit',function(req,res){
	//get form values
	var done = req.body.done;
	//update request
		request.updateAWithdrawalRequest(req.query.id,done,function(err,result){
			if(err){
				console.log(err);
			}else{
				res.redirect('/admin/withdraw_request');
			}
		});
});

module.exports = router;