'use strict';
var express = require('express'),
router = express.Router(),
authObj = require('../models/auth');
router.get('/',authObj.adminAuth,function(req,res){
    res.render('admin/index',{title:'Admin Home',user:req.session.user});
});

module.exports = router;