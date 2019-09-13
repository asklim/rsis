require('dotenv').load();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
const logger = require('morgan');

const passport = require('passport');  //passport must be before dbs-models
const { 
  createConns,
  databasesShutdown
} = require('./databases');
createConns();

require('./passport'); //after db create models

//const restRouter = require('./routes/rest-router');
//var usersRouter = require('./routes/users-router');
const apiRouter = require('./routes/api-router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, /*'server',*/ 'views'));
app.set('view engine', 'ejs');

/*
app.use((req,res,next) => {
    requestInfo2console(req);
    next();
});*/

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + './../public/favicon.ico'));

app.use(logger('dev'));
app.use(express.json({
    limit : "5mb",
}));
app.use(express.urlencoded({ 
    extended : true,
    limit : "5mb",
 }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, './../public')));
app.use(express.static(path.join(__dirname, './../static')));

app.use(passport.initialize());

app.use('/api', apiRouter);
//app.use('/users', usersRouter);
//app.use('*', restRouter);

app.get('*', 
  (req, res, next) => {
    console.log('server app: dirname is ', __dirname);
    res.sendFile( path.resolve(
        __dirname, 
        '../static/index.html'
        ),
        err => {
          if(err) { next(err); }
        }
    );
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404), req, res);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use( (err, req, res, next) => { 
    // must be 4 args
    const isDev = req.app.get('env') === 'development';
    console.log(`app-server error-handler: env='${req.app.get('env')}'`);
    console.log( isDev ? req.body : "");    

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
  app,
  databasesShutdown
};

/*
function requestInfo2console(req) {
    console.log(`Received request: ${req.method} ${req.url}`);  
    //+ ` from ${req.headers['user-agent']}`);
}
*/
