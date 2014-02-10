var express = require("express.io");
var app = express();
var mysql = require("mysql");
app.http().io();

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'kaplychka',
  user     : 'petro',
  password : 'viter'
});

var molytvy = {};

connection.query("select * from molytvy",function(err,result){
	molytvy = result;
});

app.set('view engine','jade');
app.set('views','./views');
app.use(app.router);
app.use(express.static(__dirname+'/public'));

app.locals.pretty = true;

app.io.route('ready', function(req) {
    req.io.emit('talk', {
        message: 'io event from an io route on the server'
    });
});

app.get("/", function(req,res){
	res.render('index',{title:"Капличка",molytvy:molytvy});
});


app.listen(8000);