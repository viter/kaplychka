var express = require("express.io");
var app = express();
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo")(express);
app.http().io();

var sendmsg = require('./sendmsg');

mongoose.connect('mongodb://localhost/kaplychka');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

	var Molytvy = mongoose.model('Molytvy',mongoose.Schema({
		tekst: String,
		namirennya: String,
		day: String,
		chas: String,
		active: Number,
		userid: Number
	}),'molytvy');



var molytvy1 = {};

Molytvy.find(function(err,result){
	if (err) return console.error(err);
	molytvy1 = result;
	console.log(result);
});
app.use(express.cookieParser());
app.use(express.session({store: new MongoStore({
	db:'kaplychka',
	host:'127.0.0.1'
}),secret:'viter'}));
app.set('view engine','jade');
app.set('views','./views');
app.use(app.router);
app.use(express.static(__dirname+'/public'));

app.locals.pretty = true;

sendmsg.sendm(app);

app.get("/", function(req,res){
	res.render('index',{title:"Капличка",molytvy:molytvy1});
});

app.get("/molytva/:id",function(req,res){
	req.session.name = req.params.id;
	res.render('molytva',{title:"Молитва",room:req.params.id});
});


app.listen(8000);