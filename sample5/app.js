//!/usr/bin//env node


// ***
// * load modules
// *
var express = require('express');
var ejs = require('ejs');


// ***
// * Create Application object of Express
// *
var app = express();


app.engine('ejs', ejs.renderFile);

// ***
// * Registry GET method
// * arg1: access path
// * arg2: executing function
app.get("/", function(req, res) {
	res.render('test.ejs',
		{
			'title': 'Test page',
			'content': 'this is test'
		});
});


var server = app.listen(3000, function() {
	console.log('Server is running!');
});



