var Index = require('../app/controller/index')
var Movie = require('../app/controller/movies')
var User = require('../app/controller/user')
var Comment = require('../app/controller/comment')
var Category = require('../app/controller/category')

module.exports = function(app){
	app.use(function(req,res,next){
		var _user = req.session.user;
		// if(_user){
		// 	app.locals.user = _user;
		// }
		app.locals.user = _user;
		return next();
	})

	app.get('/',Index.index);

	app.get('/movie/:id',Movie.detail);
	
	app.get('/admin/movie',User.signinRequired,User.adminRequired,Movie.new);

	app.get('/admin/update/:id',User.signinRequired,User.adminRequired,Movie.updata);
	
	app.post('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.data);
	
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
	
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del);
	
	//分类
	app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new);

	app.post('/admin/category/add',User.signinRequired,User.adminRequired,Category.save);

	app.get('/category/list',Category.list);


	//登录
	app.post('/user/signup',User.signup);
	
	app.post('/user/signin',User.signin);

	app.get('/logout',User.logout);

	app.get('/signup',User.showSignup);

	app.get('/signin',User.showSignin);

	app.get('/admin/userlist',User.signinRequired,User.adminRequired,User.list);


	
}
