// var mongoose = require('mongoose');
// var Category = mongoose.model('Category');
var Category = require('../models/category')

exports.new = function(req,res){
	res.render('category_admin',{
		title: 'movie 后台分类录入页',
		category:{}
	})
}

exports.save = function(req,res){
	var _category = req.body.category;

	Category.findOne({name:_category.name},function(err,category){
		if(err){
			console.log(err);
		}
		if(category){
			res.redirect('/');//TODO
		}else{
			category = new Category(_category);
			category.save(function(err,category){
				if(err){
					console.log(err);
				}
				res.redirect('/category/list');
			})
		}
	})
}


exports.list = function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err);
		}
		res.render('categorylist',{
			title:'movie 分类列表',
			categories:categories
		})
	})
}