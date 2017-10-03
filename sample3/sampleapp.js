var http = require('http')
var fs = require('fs');
var ejs = require('ejs');

var hello = fs.readFileSync('./hello.ejs', 'utf8');
var content1 = fs.readFileSync('./content1.ejs', 'utf8');

var port = 1234;
var server = http.createServer();
server.on('request', doRequest);
server.listen(port, function() {
	console.log('Server running on port %d', port);
});

function doRequest(req, res) {
	var hello2 = ejs.render(hello, {
		title: "title",
		content: ejs.render(content1, {
			data: [
				"This is first data.",
				"Next data",
				"Fianl data."
			]
		})
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(hello2);
	res.end();
}
