var express = require('express');			// Express
var path = require('path');					// Path
var favicon = require('serve-favicon');		// Webページにつけられるアイコンデータ関連
var logger = require('morgan');				// ログ出力関連
var cookieParser = require('cookie-parser');// クッキーの利用関連
var bodyParser = require('body-parser');	// ボディ部分のパース処理関連

var index = require('./routes/index');		// index.js内のオブジェクト
var users = require('./routes/users');		// user.js内のオブジェクト
var helo = require('./routes/helo');		// helo.js内のオブジェクト

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルート設定
// 指定のアドレスにスクリプトを割りつけ
//  => '/'にアクセスがあったら「routes」内のindex.jsが実行される
app.use('/', index);
app.use('/users', users);
app.use('/helo', helo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
