'use strict';
var express = require('express');
var router = express.Router();
var authObj = require('../models/auth');
router.get('/',authObj.adminAuth,function(req,res){
    res.render('admin/index',{title:'Amin Home',user:req.session.user});
});

module.exports = router;