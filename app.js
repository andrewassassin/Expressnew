// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');



var indexRouter = require('./routes/index');
var productRouter = require("./routes/product")
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 設定前端資源路由 /assets/ => 可指向assets資料夾內的資源
app.use('/public', express.static(path.join(__dirname, '/public')));
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


app.use('/', indexRouter);

app.use('/produc', productRouter)
app.use('/api', apiRouter);
// 設定Cookie名稱

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
