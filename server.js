var express = require('express');
var path = require('path')
var app = express()
var router = express.Router();

app.use(express.static(__dirname));

app.get('/home', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/home.html'))
});

app.get('/page2', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/page2.html'))
});


app.post('/', function(req, res){

}); 


app.listen(3000,function () {
	console.log('working')
});

module.exports = router;