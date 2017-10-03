#!/usr/bin/env node

'use strict'

var http = require('http');
var fs 	 = require('fs');

var server = http.createServer();
var port = process.env.PORT || process.env.VCAP_APP_PORT || 1234;

server.on('request', doRequest);
server.listen(port, function() {	// 待受開始
	console.log('Server running on port: %d', port);
});

/* クライアントからのリクエストを処理するためのもの
 res: クライアントからのリクエストに関する機能
 req: サーバーからクライアントへ戻されるレスポンスに関する機能
*/
function doRequest(req, res) {
	var number = Math.floor(Math.random()*3);
	fs.readFile('./hello.html', 'UTF-8', function(err, data) {
		var title   = ["page1", "page2", "page3"];
		var content = ["content1", "content2", "content3"];
		var data2 = data.replace(/@title@/g, title[number]).replace(/@content@/g, content[number]);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data2);			// コンテンツの書き出し
		res.end();
	});
}

