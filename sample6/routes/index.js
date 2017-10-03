var express = require('express');

// ルーティング(URLとそれで呼び出される処理とを関連付けるためのもの)関連
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
