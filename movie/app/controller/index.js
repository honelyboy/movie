// var mongoose = require('mongoose')
// var Movie = mongoose.model('Movie')
// var Category = mongoose.model('Category')
var Movie = require('../models/movie')
// var Category = require('../models/category')

exports.index = function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
		title:'movie 首页',
		movies:movies
		})
	})
}

// exports.index = function(req, res) {
// 	Category
// 	    .find({})
// 	    .populate({
// 	      	path: 'movies',
// 	      	select: 'title poster',
// 	      	options: { limit: 6 }
// 	    })
// 	    .exec(function(err, categories) {
// 	      	if (err) {
// 	        	console.log(err)
// 	     	 }

// 	      	res.render('index', {
// 	        	title: 'imooc 首页',
// 	        	categories: categories
// 	      	})
// 	    })
// }