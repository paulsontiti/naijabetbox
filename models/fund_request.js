'use strict';
var mongoose = require('../models/mongoose');
//request schema
var fundSchema = mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	betting_company:{
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
        default:new Date().getFullYear().toString() + '-'+ (new Date().getMonth() + 1).toString() + '-' + new Date().getDate().toString()
	},
	done:{
		type:String,
		required:true,
		default:'No'
	}
});
var FundRequest = module.exports = mongoose.model('FundRequest',fundSchema);
module.exports.createFundRequest =function(request,callback){
	request.save(callback);
};
module.exports.getAllFundRequest =function(callback){
	FundRequest.find(callback);
};
module.exports.updateAFundRequest = function(id,done,callback){
	FundRequest.update({_id:id},{$set:{done:done}},callback);
};