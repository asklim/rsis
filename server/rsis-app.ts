import {
    default as createError,
    HttpError
} from 'http-errors';
import path from 'node:path';

import express, {
    Request,
    Response
}  from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import passport from 'passport';
//const uuid = require('uuid');
//const createError = require('http-errors');
//const favicon = require('serve-favicon');
//const LocalStrategy = require('passport-local').Strategy;

import paths from '../config/paths';
import {
    debugFactory,
    env,
    // icwd,
    Logger,
} from './helpers/';

import herokuPinger from './heroku-no-sleep/';
import { API_SERVER_LOCAL } from './rsis.config';

import { default as app } from './rsis-express';

import apiRouter from './api-router';

const d = debugFactory('rsis:app');
const log = new Logger('[rsis:app]');

const {
    // NODE_ENV,
    isProduction,
    DEV_MODE,
    API_SERVER: API_WWW_SERVER  //'https://rsis-webapp.herokuapp.com'
} = env;

const isHMR = DEV_MODE === 'HotModuleReplacement';

d('getStartTime:', app.getStartTime() );


app.set('apiServer', isProduction ? API_WWW_SERVER : API_SERVER_LOCAL );
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

// app.use((req, _res, next) => {
//     const html = path.resolve( icwd, `${paths.distFolderName}/index.html`);
//     d(`request url: ${req.url}`);
//     d(`'index.html' is ${html}`);
//     next();
// });

app.use( express.urlencoded({ extended: true, limit: "5mb" }));
app.use( cookieParser() );

app.use( passport.initialize() );
//app.use( passport.session() );

// log.debug(`build path: ${paths.appBuild}`); // full path
app.use( express.static( paths.distFolderName /*'dist'*/ ));

app.use( cors() );
//app.options('*', cors() );


if( !isProduction && isHMR ) {
    // (async () => {
    //     const useDevHotMW = (await import('../config/use-devhmr-middleware.mjs')).default;
    //     useDevHotMW( app, log );
    // })();
    //     const webpack = (await import('webpack')).default;
    //     const devHMRConfig = (await import('../config/webpack.devhmr')).default;
    //     const webpackDevMW = (await import('webpack-dev-middleware')).default;
    //     const webpackHotMW = (await import('webpack-hot-middleware')).default;
    //     const compiler = webpack( devHMRConfig );

    //     const wdmOption = {
    //         publicPath: devHMRConfig.output.publicPath,
    //     };
    //     log.debug('webpack-dev-middleware (wdm) config: ', wdmOption );
    //     express.use( webpackDevMW( compiler, wdmOption ));
    //     express.use( webpackHotMW( compiler, {
    //         path: '/__webpack_hmr',
    //         heartbeat: 10 * 1000,
    //     }));
}

app.get('*', (
    req: Request,
    res: Response,
    next: any
) => {
    const INDEX_HTML_PFN = path.resolve( __dirname, `../index.html`);

    d(`[app.get.*] request url: ${req.url}`);
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
        }
    );
});

// catch 404 and forward to error handler
app.use( function(
    req: Request,
    res: Response,
    next: any
) {
    next( createError( 404 ), req, res );
});

/**
 *  LAST ERROR HANDLER in ExpressApp
 * */
app.use((
    err: HttpError,
    req: Request,
    res: Response,
    _next: unknown
    // must be 4 args
) => {
    log.debug(`[GEH] request url: ${req.url}`);

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

d('app locals', app.locals );

const EVERY_30_MINUTE = 30;
/** Закрытие pinger будет после закрытия server  */
herokuPinger( app, EVERY_30_MINUTE );


export default app;
