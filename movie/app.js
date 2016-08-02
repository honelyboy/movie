var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 8081
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.text({ type: 'text/html' }));
app.set('views','./views/pages');
app.set('view engine','jade');
// app.use(bodyParser)
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);

console.log('movie start');

app.get('/',urlencodedParser,function(req,res){
	res.render('index',{
		title:'movie 首页',
		movies:[{
			title:'机械战警',
			_id:1,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:2,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:3,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:4,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		},{
			title:'机械战警',
			_id:5,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'movie 详情',
		movie:{
			doctor:'孔毅',
			country:'中国',
			title:'机械战警',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'英语',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'2028年，omnicorp集团，是机器人技术的研究中心。他们的无人机使美国在全球各地赢得战争，他们希望把这项技术应用到家门前。亚历克斯·墨菲是一个充满爱心的丈夫，好父亲，好警察，尽全力来阻止在底特律的犯罪和腐败的浪潮。而一群犯罪分子用藏在车中的炸弹将他炸伤，最终，他严重受伤因公殉职，科学家将他改造成了令坏蛋闻风丧胆的机械战警'
		}
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

app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'movie 列表页',
		movies:[{
			title:'机械战警',
			_id:1,
			doctor:'KONGYI',
			language:'英语',
			country:'中国',
			year:2017
		}]
	})
})
