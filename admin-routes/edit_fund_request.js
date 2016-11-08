'use strict';
var express = require('express'),
router = express.Router(),
request = require('../models/fund_request'),
authObj = require('../models/auth');

/* GET credit_account page. */
router.get('/',authObj.adminAuth,function(req, res, next) {
   	res.render('admin/edit_fund_request',{title:'Edit fund request',id:req.query.id,done:req.query.done,csrfToken:req.csrfToken()});
});

router.post('/edit',function(req,res){
	//get form values
	var done = req.body.done;
		request.updateAFundRequest(req.query.id,done,function(err,result){
			if(err){
				console.log(err);
			}else{
				res.redirect('/admin/fund_request');
			}
		});
});

module.exports = router;