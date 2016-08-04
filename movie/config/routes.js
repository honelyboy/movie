var Index = require('../app/controller/index')
var Movie = require('../app/controller/movies')
var User = require('../app/controller/user')

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
	
	app.get('/admin/movie',Movie.new);

	app.get('/admin/update/:id',Movie.updata);
	
	app.post('/admin/movie/new',Movie.data);
	
	app.get('/admin/list',Movie.list);
	
	app.delete('/admin/list',Movie.del);
	
	app.post('/user/signup',User.signup);
	
	app.post('/user/signin',User.signin);

	app.get('/logout',User.logout);
	
}
