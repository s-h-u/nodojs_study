#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
var url = require('url');
var qs = require('querystring');

var template = fs.readFileSync('./template.ejs', 'utf8');
var content1 = fs.readFileSync('./content1.ejs', 'utf8');
var content2 = fs.readFileSync('./content2.ejs', 'utf8');
var content3 = fs.readFileSync('./content3.ejs', 'utf8');

var routes = {
	"/": {
		"title": "Main page",
		"message": "This is sample page.",
		"content": content1
	},
	/*"/index": {
		"title": "Main page",
		"message": "This is sample page.",
		"content": content1
	},*/
	"/other": {
		"title": "Other page",
		"message": "This is other page.",
		"content": content2
	},
	"/post": {
		"title": "Post page",
		"content": content3
	}
};

var server = http.createServer();
server.on('request', doRequest);
server.listen(1234, function() {
	console.log("Server running!");
});

function doRequest(request, response) {
	var url_parts = url.parse(request.url);
	if (routes[url_parts.pathname] === null) {
		console.log("NOT FOUND PAGE:" + request.url);
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.end("<html><body><h1>NOT FOUND PAGE:" + request.url + "</h1></body></html>");
		return;
	}
	if (request.method == "GET") {
		var content = ejs.render(template, 
			{
				title: routes[url_parts.pathname].title,
				content: ejs.render(routes[url_parts.pathname].content,
					{
						message: routes[url_parts.pathname].message
					}
				)
			}
		);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(content);
		response.end();
		return;
	}
	if (request.method == "POST") {
		if (url_parts.pathname == "/post") {
			var body = '';
			request.on('data', function(data) {
				body += data;
			});
			request.on('end', function() {
				var post = qs.parse(body);
				var content = ejs.render( template,
                    {
                        title: routes[url_parts.pathname].title,
                        content: ejs.render(
                            routes[url_parts.pathname].content,
                            {
                                idname: post.idname,
                                pass: post.pass
                            }
                        )
                    }
				);
				response.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
				response.write(content);
				response.end();
			});
		} else {
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write("NO-POST");
			response.end();
		}
	}
}
