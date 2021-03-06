'use strict';
var mongoose = require('../models/mongoose');

var requsetSchema = mongoose.Schema({
	firstname:{
		type:String,
		required:true
	},
	surname:{
	type:String,
		required:true
	},
	bank:{
	type:String,
		required:true
	},
	account_number:{
		type:String,
		required:true,
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
		required:true,
		default:'No'
	}
});

var WithdrawRequest = module.exports = mongoose.model('WithdrawRequest',requsetSchema);
module.exports.createWithdrawRequest =function(request,callback){
	request.save(callback);
};
module.exports.getAllWithdrawRequest =function(query,callback){
	WithdrawRequest.find(query,callback);
};
module.exports.updateAWithdrawalRequest = function(id,done,callback){
	WithdrawRequest.findOneAndUpdate({_id:id},{$set:{done:done}},callback);
};