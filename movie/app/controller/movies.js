var mongoose = require('mongoose')
var Movie = require('../models/movie')
var Category = require('../models/category')
var Comment = require('../models/comment')
// var Category = mongoose.model('Category')
// var Comment = mongoose.model('Comment')
var _ = require('underscore')

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
	Category.find({},function(err,categories){
		if(err){
			console.log(err);
		}
		res.render('admin',{
			title:'movie 后台录入页',
			categories:categories,
			movie:{}
		})
	})
}

exports.updata = function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			Category.find({},function(err,categories){
				res.render('admin',{
					title:'',
					categories:categories,
					movie:movie
				})
			})
		})
	}
}


exports.data = function(req,res){

	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie

	// if(req.poster){
	// 	movieObj.poster = req.poster;
	// }

	if(id){
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
		// _movie = new Movie({
		// 	doctor:movieObj.doctor,
		// 	title:movieObj.title,
		// 	country:movieObj.country,
		// 	language:movieObj.language,
		// 	year:movieObj.year,
		// 	poster:movieObj.poster,
		// 	summary:movieObj.summary,
		// 	flash:movieObj.flash
		// })
		_movie = new Movie(movieObj);

		var categoryId = movieObj.Category;
		var categoryName = movieObj.categoryName;

		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			if(categoryId){
				Category.findById(categoryId,function(err,category){
					category.movies.push(movie._id);
					category.save(function(err,category){
						res.redirect('/movie/'+movie._id);
					})
				})
			}
			else if(categoryName){
				var category = new Category({
					nam:categoryName,
					movies:[movie._id]
				})
				category.save(function(err,category){
					movie.category = category._id;
					movie.save(function(err,movie){
						res.redirect('/movie/'+movie._id);
					})
				})
			}
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