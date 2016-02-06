var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('nbapp',['nbapp']);
var url = require('url');

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//app.use(express.bodyParser());
//app.use(bodyParser.urlencoded());

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/list',function (req,res){
	console.log("in /list");
	db.nbapp.find(function(error,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/find',function (req,res){
	console.log(req.query);
	db.nbapp.find(req.query,function(error,docs){
		console.log("in find");
		console.log(docs);
		res.json(docs);
	});
});

app.get('/stats',function (req,res){
	console.log("/stat was requested");
	db.nbapp.aggregate(
	{$group :
		{_id: "$choice1"}, 
		recordcnt: {$sum:1}},
		{$sort: {recordcnt : -1}},
		function(error,docs){
			console.log(docs);
			res.json(docs);
	});
});

app.get('/stats2',function (req,res){
	console.log("/stat was requested");
	db.nbapp.aggregate(
	{$unwind: "$choicearr"},
	{$group :
		{_id: "$choicearr", 
		recordcnt: {$sum:1}}},
		{ $sort : { recordcnt : -1} },
		// {$sort: {recordcnt : -1}},
		function(error,docs){
			console.log(docs);
			res.json(docs);
		});
});

app.post('/post',function (req,res){
	//console.log(req.body);
	db.nbapp.insert(req.body,　function(err,docs){
		//console.log(docs);
		res.json(docs);
	});
});

//small change

// {"$unwind": "$tags"},
// ...     {"$group": {"_id": "$tags", "count": {"$sum": 1}}}

// app.post('/post',function (req,res){
// 	//console.log(req.body);
// 	db.nbapp.insert(req.body,　function(err,docs){
// 		//console.log(docs);
// 		res.json(docs);
// 	});
// });

app.delete('/deleteall',function (req,res){
	db.nbapp.remove({});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})