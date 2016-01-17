var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('nbapp',['nbapp']);

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
	db.nbapp.find(function(error,docs){
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

app.delete('/deleteall',function (req,res){
	db.nbapp.remove({});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})