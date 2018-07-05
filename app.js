var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var history = require('connect-history-api-fallback');
var index = require('./routes/index');
var users = require('./routes/users');
var reports = require('./routes/report');
var uploads = require('./routes/upload')


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(80);

app.use(history());

/* 监听io 事件*/
io.on('connection',function (socket) {
    socket.emit('uploadSuccess',{
        message: 'OJ8K'
    });
    socket.on('reponse',function (data) {
        console.log(data);
    });
    socket.on('open',function (bool) {
        if (bool){
            socket.emit('success','去你阿妈的');
        }
    })
});

//跨域问题
app.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials','true');
	next();
});
//view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 一级路由
app.use('/', index);
app.use('/users', users);
app.use('/reports',reports);
app.use('/upload',uploads);

/*打包路径*/
app.use(express.static(path.join(__dirname, 'dist')));

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
