var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var _ = require('underscore')
var Movie = require('./models/movie')
var User = require('./models/user')
var bodyParser = require('body-parser')
var port = process.env.PORT || 8081
var app = express();

var dbUrl = 'mongodb://localhost/movie';

var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect(dbUrl);
app.use(cookieParser());
app.use(session({
	secret:'movie',
	store:new mongoStore({
		url:dbUrl,
		autoRemove: 'interval',
      	autoRemoveInterval: 10
	})
	// store: new mongoStore({
	// 	url:dbUrl,
	// 	collection:'sessions'
	// })
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: 'text/html' }));
app.set('views','./views/pages');
app.set('view engine','jade');
// app.use(bodyParser)
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
app.listen(port);

console.log('movie start');

app.get('/',urlencodedParser,function(req,res){
	console.log(req.session);
	console.log("首页")
	var _user = req.session.user;
	if(_user){
		app.locals.user = _user;
	}
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
		title:'movie 首页',
		movies:movies
		})
	})
})

app.get('/movie/:id',function(req,res){
	console.log("/movie/:id");
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err)
		}
		res.render('detail',{
			title:'movie ' + movie.title,
			movie:movie
		})
	})
})

app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movie 后台录入页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})


app.get('/admin/update/:id',function(req,res){
	console.log("/admin/update/:id'")
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render("admin",{
				title:'movie 后台更新页',
				movie:movie
			})
		})
	}
})

app.post('/admin/movie/new',urlencodedParser,function(req,res){
	console.log("/admin/movie/new");
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie

	if(id !=='undefined'){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie = _.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect('/movie/'+movie._id)
		})
	}
})

app.get('/admin/list',function(req,res){
	console.log('/admin/list get');

	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'movie 列表页',
			movies:movies
		})
	})
	
})

app.delete('/admin/list',function(req,res){
	console.log('/admin/list  delete');
	// var id = req.params.id;
	var id = req.query.id;
	console.log('/admin/list  delete----'+id);
	if(id){
		Movie.delete(id,function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1});
			}
		})
	}else{
		res.json({success:0})
	}
})

app.post('/user/signup',function(req,res){
	var _user = req.body.user;
	var user = new User(_user);
	 user.save(function(err,user){
	 	if(err){
	 		console.log(err);
	 	}
	 	res.redirect('/')
	 })
})

app.post('/user/signin',function(req,res){
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
})

app.get('/logout',function(req,res){
	delete req.session.user;
	delete app.locals.user;
	res.redirect('/')
})





