
var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
	res.render('helo', {
		title: 'Helo',
		data: {
			'taro': 'taro@yamada',
			'hanako': 'hanako@flower',
			'tsuyano': 'tsuyano@syoda.com'
		}
	});
});

module.exports = router;
