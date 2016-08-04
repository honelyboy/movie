var User = require('../models/user')

exports.signup = function(req,res){
	var _user = req.body.user;
	var user = new User(_user);
	 user.save(function(err,user){
	 	if(err){
	 		console.log(err);
	 	}
	 	res.redirect('/')
	 })
}

exports.signin = function(req,res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/');
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				req.session.user = user;
				console.log('password is success');
				res.redirect('/')
			}else{
				// return 
				console.log('password is wrong');
			}
		})
	})
}

exports.logout = function(req,res){
	delete req.session.user;
	// delete app.locals.user;
	res.redirect('/')
}


