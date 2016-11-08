'use strict';
var mongoose = require('../models/mongoose');
//request schema
var rechargeSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	network:{
		type:String,
		required:true
	},
	phone_number:{
		type:String,
		required:true
	},
	amount:{
		type:Number,
		required:true
	},
	request_date:{
        type:String,
        required:true,
        default:new Date().toLocaleString()
	},
	done:{
		type:String,
		default:'No',
		required:true
	}
});
var RechargeRequest = module.exports = mongoose.model('RechargeRequest',rechargeSchema);
module.exports.createRechargeRequest = function(request,callback){
	request.save(callback);
};
module.exports.getAllRechargeRequest = function(query,callback){
	RechargeRequest.find(query,callback);
};
module.exports.updateARechargeRequest = function(id,done,callback){
	RechargeRequest.findOneAndUpdate({_id:id},{$set:{done:done}},callback);
};