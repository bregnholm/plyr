var express = require('express');
var morgan = require('morgan');
var app = express();
var fs = require('fs');
var compression = require('compression');
var crypto = require('crypto');
var cors = require('express-cors')

var http = require('http').createServer(app);

var HTTP_PORT = 9124;

var HTTPS_PORT = 8107;

var options = {
	key: fs.readFileSync('/etc/letsencrypt/live/twoseven.xyz/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/twoseven.xyz/fullchain.pem')
};

app.use(morgan('combined'));
app.use(compression());

app.use(cors({
  allowedOrigins: [
  	'*.jsfiddle.net', '*.jshell.net'
  ]
}));


/* ------------------------ TEST URLS ------------------------*/
app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.get('/test', function(req, res) {
	res.send(fs.readFileSync(__dirname + '/test.html', 'utf-8'));
});

app.get('/cast', function(req, res) {
	res.send(fs.readFileSync(__dirname + '/cast.html', 'utf-8'));
});
/* -------------------- END OF TEST URLS --------------------*/

app.use('/src', express.static(__dirname + '/../src'));
app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/demo', express.static(__dirname));

http.listen(HTTP_PORT, function () {
	console.log('HTTP listening on port ' + HTTP_PORT);
});

var https = require('https').createServer(options, app);
https.listen(HTTPS_PORT, function() {
	console.log('HTTPS listening on port ' + HTTPS_PORT);
});
