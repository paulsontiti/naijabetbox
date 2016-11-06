'use strict';
module.exports ={
      auth: function(req,res,next){
      	
			   if(!req.session.username){
			    res.redirect('/login');
			   }else{
			   	next();
			   }
			},
			adminAuth : function(req,res,next){
				if(!req.session.username){
                     res.redirect('/login');
      			}else{
      				if(req.session.isAdmin !== 'Yes'){
      					res.redirect('/admin_unauthorised');
      				}else{
      				res.locals.username = req.session.username;
			   		next();
			   	}
      			}
			}
}