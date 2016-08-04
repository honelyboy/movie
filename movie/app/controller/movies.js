var _ = require('underscore')
var Movie = require('../models/movie')

exports.detail = function(req,res){
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
}

exports.new = function(req,res){
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
}

exports.updata = function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render("admin",{
				title:'movie 后台更新页',
				movie:movie
			})
		})
	}
}


exports.data = function(req,res){
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
}

exports.list = function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'movie 列表页',
			movies:movies
		})
	})
}

exports.del = function(req,res){
	var id = req.query.id;
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
}