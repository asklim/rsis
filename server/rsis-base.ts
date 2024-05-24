
import http from 'node:http';
import { Duplex } from 'node:stream';
import { basename } from 'node:path';
import type { ErrnoException } from './types';

import { showServerAppInfo } from './helpers/startup/';
import {
    debugFactory,
    env,
    Logger
 } from './helpers/';

import herokuPinger from './heroku-no-sleep/';

import {
    createMongoDBConnections,
    databasesShutdown,
} from './databases';

import { default as rsisExpressApp, } from './rsis-app';


const d = debugFactory(`dbg:${basename(__filename)}`);
const log = new Logger('[rsis:base]');

createMongoDBConnections();

// d(`typeof getMyDB is ${typeof rsisExpressApp.getMyDB}`); // function
//debug( rsisExpressApp.get('env')); // == NODE_ENV

const server = http.createServer( rsisExpressApp );
rsisExpressApp.set('getHTTPServer', () => server );
initialSetupServer();
initialSetupProcess();


/**
 * Listen on provided port, on all network interfaces.
 */
export function startServer () {

    server.listen( env.PORT,  () => {
        // log.info(`server listening on port ${env.PORT}`);
        showServerAppInfo( server, log );
    });
    d('rsisExpressApp.locals', rsisExpressApp.locals );

    const EVERY_30_MINUTES = 30;
    /** Закрытие pinger будет после закрытия server  */
    herokuPinger( rsisExpressApp, EVERY_30_MINUTES );
}


/***************************************************/


function initialSetupServer () {

    /**
     * Event listener for HTTP server "error" event.
     */
    const handlerErrorEvent = (err: ErrnoException) => {

        if( err.syscall !== 'listen') {
            throw err;
        }

        // handle specific listen errors with friendly messages
        switch( err?.code ) {

            case 'EACCES':
                log.error(`Port ${env.PORT} requires elevated privileges.`);
                process.exit( 1 );
                break;

            case 'EADDRINUSE':
                log.error(`Port ${env.PORT} is already in use.`);
                process.exit( 1 );
                break;

            default:
                log.error(`www-server unhandled error !!!`, err );
                throw err;
        }
    };

    /**
     * Event listener for HTTP server "listening" event.
     * fired once after setting requestListener on port.
     */
    const handlerListeningEvent = () => {
        const _a = server.address();
        const addr = _a ?? typeof( _a );
        const bind = typeof addr === 'string' ?
            `pipe ${addr}`
            : `port ${addr.port}`
        ;
        log.debug(`fired event ["listening"] on ${bind}.`);
    };


    server.on('error', handlerErrorEvent );

    server.on('listening', handlerListeningEvent );

    server.on('clientError', (_err: Error, socket: Duplex) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });

    server.on('close', () => {
        log.info('http-server closing ...');
        rsisExpressApp.emit('close');
        // ngrok.disconnect();
        // console.log('ngrok disconnected.');
    });
}


async function shutdownTheServer () {
    return server.close(
        (err) => {
            if ( err ) {
                log.error('Error of closing server.\n', err );
                return;
            }
            log.info('http-server closed now.');
    });
}


function initialSetupProcess () {

    // CAPTURE APP TERMINATION / RESTART EVENTS
    const OK_EXIT_CODE = 0;
    const blankTwoChars = () => console.log('\b\b\x20\x20');

    process.on( // For app termination
        'SIGINT',
        async () => {
            blankTwoChars();
            log.info('Got SIGINT signal (^C)!\n');
            const p = shutdownTheServer();
            //d('shutdown returns', p ); // Promise { <pending> }
            await p;
            //d('shutdown returns', p ); // Promise { undefined }
            await databasesShutdown(
                'SIGINT, app termination',
                () => {}
            );
            console.log(`Process finished (pid:${process.pid}, exit code: 0).`);
            process.exit( OK_EXIT_CODE );
        }
    );

    // For Heroku app termination
    process.on('SIGTERM', async () => {
        await shutdownTheServer();
        await databasesShutdown(
            'SIGTERM, app termination',
            async () => {
                const EXIT_DELAY = 500;
                setTimeout( process.exit, EXIT_DELAY, OK_EXIT_CODE );
            }
        );
    });

    // For nodemon restarts
    process.once('SIGUSR2', async () => {
        await shutdownTheServer();
        await databasesShutdown(
            'SIGUSR2, nodemon restart',
            async () => {
                setTimeout( process.kill, 500, process.pid, 'SIGUSR2');
            }
        );
    });
}
