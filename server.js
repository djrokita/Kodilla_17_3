var express = require('express');
var app = express();
var fs = require('fs');
var stringIfyFile;
var myJSON;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getNote', function(request, response) {
	console.log('Poszło zapytanie o treść pliku JSON');
	fs.readFile('./test.json', 'utf8', function(err, data) {
		if (err) throw err;
		response.send(data);
	});
});

app.post('/updateNote/:note', function(request, response) {
	console.log('Poszło żądanie o uzupełnienie danych');
	fs.readFile('./test.json', 'utf8', function(err, data) {
		if (err) throw err;
		stringIfyFile = data;
		myJSON = JSON.parse(stringIfyFile);
		myJSON.menu.notes.push(request.params.note);
		stringIfyFile = JSON.stringify(myJSON);
		fs.writeFile('./test.json', stringIfyFile, function(err) {
			if (err) throw err;
			console.log('file updated');
			response.end();
		});
	});
});

var server = app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});