//const debug = require( 'debug' )('rsis:app');
const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const cors = require( 'cors' );
//const favicon = require( 'serve-favicon' );
const cookieParser = require( 'cookie-parser' );
//const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
//const uuid = require( 'uuid' );

const {
    NODE_ENV,
    DEV_MODE,
} = process.env;

const isProduction = NODE_ENV === 'production';
const isHMR = DEV_MODE === 'HotModuleReplacement';


const passport = require( 'passport' );  //passport must be before dbs-models
const {
    createMongoDBConnections,
    databasesShutdown,
} = require( './databases' );


createMongoDBConnections();


require( './passport' ); //after db create models

const app = express();
const apiRouter = require( './api-router' );

// view engine setup
app.set( 'views', './views' );
app.set( 'view engine', 'ejs' );

app.use( passport.initialize() );

// uncomment after placing your favicon in /public
//app.use( favicon( `${icwd}/public/favicon.ico` ));

app.use( cors() );

const loggerTemplate = [
    '[:date[web]]', ':status',
    //':remote-addr', ':remote-user',
    ':method :url :response-time[0] ms - :res[content-length]'
].join(' ');
app.use( morgan( loggerTemplate )); // dev | common | combined |short

app.use( express.json({
    limit: "5mb",
}));

app.use( express.urlencoded({
    extended: true,
    limit: "5mb",
}));

app.use( cookieParser() );
app.use( express.static( '../static' ));

app.use( '/api', apiRouter );


if( !isProduction && isHMR ) {

    const webpack = require( 'webpack' );
    const webpackConfig = require( '../config/webpack.devhmr.js' );
    const webpackDevMiddleware = require( 'webpack-dev-middleware' );

    const compiler = webpack( webpackConfig );

    const wdmOption = {
        publicPath: webpackConfig.output.publicPath,
    };
    console.log( 'webpack-dev-middleware (wdm) config: ', wdmOption );
    app.use( webpackDevMiddleware( compiler, wdmOption ));
    app.use( require( 'webpack-hot-middleware' )( compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}


app.get( '*', (_req, res, next) => {

    const INDEX_HTML_PFN = path.resolve( `../static/index.html` );

    console.log( `server__dirname is ${__dirname}` );
    console.log( `index.html must be ${INDEX_HTML_PFN}` );

    res.sendFile( INDEX_HTML_PFN,
        (err) => {
            if( err ) {
                console.log( `E: error sending '${INDEX_HTML_PFN}'`);
                console.log( err );
                next( err );
            }
        }
    );
});


// catch 404 and forward to error handler
app.use( (req, res, next) => {
    console.log( 'create Error 404.' );
    next( createError( 404 ), req, res );
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use( (err, req, res, _next) => {
    // must be 4 args
    let runMode = req.app.get( 'env' );
    const isDev = runMode === 'development';
    console.log( `app-server error-handler: env = '${runMode}'` );
    console.log( isDev
        ? (req.body && Object.keys( req.body ).length > 0)
            ? req.body
            : req
        : ""
    );

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status( err.status || 500 );
    //res.render( 'error' );
});



module.exports = {
    app,
    databasesShutdown,
};

