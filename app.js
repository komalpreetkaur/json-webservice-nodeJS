var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(err, req, res, next) {
  if (err) {
    console.error('Bad JSON');
	var jsonErr = {
			"error": "Could not decode request: JSON parsing failed"
		}
		res.contentType('application/json');
		res.statusCode = 400;
		res.send(JSON.stringify(jsonErr));
  }
});

var routes = require("./routes/routes.js")(app);

app.set('port', (process.env.PORT || 3000));
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});