const debug = require('debug')('rsis:app');

const log = require('./helpers/').consoleLogger('[rsis:app]');

//const uuid = require('uuid');
//const createError = require('http-errors');
//const favicon = require('serve-favicon');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const paths = require('../config/paths');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;

const herokuPinger = require('./heroku-no-sleep/');

const { API_SERVER_LOCAL } = require(`./rsis.config.js`);

const {
    NODE_ENV,
    DEV_MODE,
    API_SERVER: API_WWW_SERVER
} = process.env;

const isProduction = NODE_ENV === 'production';
const isHMR = DEV_MODE === 'HotModuleReplacement';


const app = require('./rsis-express');
// @ts-ignore
debug('getStartTime:', app.getStartTime() );

const apiRouter = require('./api-router');

app.set('apiServer', NODE_ENV === 'production' ?
    API_WWW_SERVER  //'https://rsis-webapp.herokuapp.com'
    : API_SERVER_LOCAL
);
// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use( favicon(`${icwd}/public/favicon.ico`));

const loggerTemplate = [
    '[:date[web]]', ':status',
    //':remote-addr', ':remote-user',
    ':method', ':url', ':response-time[0] ms -', ':res[content-length]'
].join(' ');
app.use( morgan( loggerTemplate )); // dev | common | combined |short

/** json MUST BE BEFORE routers */
app.use( express.json({ limit: "5mb" }));

app.use('/api', apiRouter );

app.use((req, _res, next) => {
    // const html = path.resolve( __dirname, `../${paths.distFolderName}/index.html`);
    // debug(`request url: ${req.url}`);
    // debug(`'index.html' is ${html}`);
    next();
});

app.use( express.urlencoded({ extended: true, limit: "5mb" }));
app.use( cookieParser() );

app.use( passport.initialize() );
//app.use( passport.session() );

// log.debug(`build path: ${paths.appBuild}`); // full path
app.use( express.static( paths.distFolderName /*'static'*/ ));

app.use( cors() );
//app.options('*', cors() );

if( !isProduction && isHMR ) {

    const webpack = require('webpack');
    const webpackConfig = require('../config/webpack.devhmr.js');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    // @ts-ignore
    const compiler = webpack( webpackConfig );

    const wdmOption = {
        publicPath: webpackConfig.output.publicPath,
    };
    log.debug('webpack-dev-middleware (wdm) config: ', wdmOption );
    app.use( webpackDevMiddleware( compiler, wdmOption ));
    app.use( require('webpack-hot-middleware')( compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}


// eslint-disable-next-line no-unused-vars
app.get('*', (req, res, next) => {

    const INDEX_HTML_PFN = path.resolve( __dirname, `../static/index.html`);

    debug(`request url: ${req.url}`);
    log.info(`server __dirname is ${__dirname}`);
    log.info(`sending 'index.html' from ${INDEX_HTML_PFN}`);

    res.sendFile( INDEX_HTML_PFN,
        (err) => {
            if( err ) {
                log.error(`sending error of '${INDEX_HTML_PFN}'`);
                console.log( err );
                //TODO: Выяснить как работает Error Handling
                // Нужно ли передавать 'err' дальше?
                // Нужно ли генерировать ошибку 404?
                next( err );
            }
            else {
                next();
            }
        }
    );
});

/*
app.use( (req, res, next) => {
    // catch 404 and forward to error handler
    console.log('create Error 404.');
    next( createError( 404 ), req, res );
});
*/

/**
 *  LAST ERROR HANDLER in ExpressApp
 * */
app.use((
    // eslint-disable-next-line no-unused-vars
    err, req, res, _next
    // must be 4 args
) => {
    log.debug(`request url: ${req.url}`);

    let runMode = req.app.get('env');
    const isDev = runMode === 'development';
    console.log(`app-server error-handler: env = '${runMode}'`);
    console.log( isDev ?
        (req.body && Object.keys( req.body ).length > 0) ?
            req.body
            : req
        : ''
    );

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status( err.status || 500 ).end();
    //res.render('error');
});

debug('app locals', app.locals );

const EVERY_30_MINUTE = 30;
/** Закрытие pinger будет после закрытия server  */
herokuPinger( app, EVERY_30_MINUTE );


module.exports = {
    app,
    //databasesShutdown,
};
