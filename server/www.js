#!/usr/bin/env node

require( 'dotenv' ).config();

const log = require( 'loglevel' );
const isProduction = process.env.NODE_ENV === 'production';
log.setLevel( isProduction ? log.levels.DEBUG : log.levels.TRACE );

const {
    app: rsisExpressApp,
    databasesShutdown,
} = require( './rsis-app.js' );

const debug = require( 'debug' )('rsis:www');
const http = require( 'http' );
const os = require( 'os' );
const util = require( 'util' );
const colors = require( 'colors' );

const {
    icwd,
    getProcessEnvWithout,
} = require( './helpers/' );

const version = require( `${icwd}/package.json` ).version;

outputStartServerInfo();


const heroku = require( './heroku-no-sleep/' );
const EVERY_30_MINUTE = 30;

heroku.startReconnectionService( EVERY_30_MINUTE );


/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort( process.env.PORT || '3067' );
rsisExpressApp.set( 'port', port );



/**
 * Create HTTP server.
 */
const server = http.createServer( rsisExpressApp );


const shutdownTheServer = async() => {

    return new Promise( (resolve) => {
        server.close( () => {
            console.log( 'http-server closed now.' );
            resolve();
        });
    });
};


const handlerOnError = error => {

    /**
     * Event listener for HTTP server "error" event.
     *
     */

    if( error.syscall !== 'listen' ) {

        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch( error.code ) {

        case 'EACCES':
            console.error( bind + ' requires elevated privileges' );
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error( bind + ' is already in use' );
            process.exit(1);
            break;

        default:
            console.log( `E: www-server unhandled error !!!` );
            console.log( error );
            //throw error;
    }
};


const handlerOnListening = () => {

    /**
     * Event listener for HTTP server "listening" event.
     */

    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    ;

    debug( 'Listening on ' + bind );
};


server.on( 'error', handlerOnError );

server.on( 'listening', handlerOnListening );

server.on( 'clientError', (_err, socket) => {

    socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
});

server.on( 'close', () => {

    console.log( 'http-server closing ....' );
    heroku.stopReconnectionService();
    //ngrok.disconnect();
    //console.log( 'ngrok disconnected.' );
});



/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(
    port,
    () => {
        serverAppOutput( 'addr'/*'full'*/, version, server );
    }
);


// *************************************************************
// CAPTURE APP TERMINATION / RESTART EVENTS


process.once( 'SIGUSR2', () => { // For nodemon restarts
    databasesShutdown(
        'SIGUSR2, nodemon restart',
        async () => {
            await shutdownTheServer();
            setTimeout( process.kill, 500, process.pid, 'SIGUSR2' );
        }
    );
});

// For app termination
process.on( 'SIGINT', () => {
    console.log('!');
    databasesShutdown(
        'SIGINT, app termination',
        async () => {
            await shutdownTheServer();
            setTimeout( process.exit, 500, 0 );
        }
    );
});

// For Heroku app termination
process.on( 'SIGTERM', () => {
    databasesShutdown(
        'SIGTERM, app termination',
        async () => {
            await shutdownTheServer();
            setTimeout( process.exit, 500, 0 );
        }
    );
});



/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(
    val
) {
    let port = parseInt( val, 10 );
    return isNaN( port )
        ? val       // named pipe
        : port >= 0
            ? port  // port number
            : false
    ;
}



/**
 *
 * @param {*} outputMode
 * @param {*} appVersion
 * @param {*} httpServer
 */
function serverAppOutput(
    outputMode,
    appVersion,
    httpServer
) {
    let serverAddress = httpServer.address();
    let {
        address,
        family,
        port
    } = serverAddress;

    let bind = typeof serverAddress === 'string'
        ? 'pipe ' + serverAddress
        : 'port ' + port;

    const outputs = {
        full: () => console.log( 'Express server = ',  httpServer, '\n' ),
        addr: () => {
            const node_env = process.env.NODE_ENV || 'undefined';
            console.log( 'app version ', appVersion.cyan );
            console.log( 'NODE Environment is ', node_env.cyan );
            console.log(
                'Express server = "' + address.cyan
                + '" Family= "' + family.cyan
                + '" listening on ' + bind.cyan, '\n'
            );
        },
        default: () => console.log( '\n' )
    };

    (outputs[ outputMode.toLowerCase() ] || outputs[ 'default' ])();
}


async function outputStartServerInfo() {

    getProcessEnvWithout( 'npm_, XDG, LESS' ).
    then( (envList) => {
        console.log( envList );

        const { PWD, USER, NAME, } = process.env;
        const userInfo = util.format( '%O', os.userInfo() );

        console.log( `stdout.isTTY is ${process.stdout.isTTY}`.yellow );
        // true - in terminal, undefined - in service journal

        console.log( `package.json dir is ${icwd}`.red ); // = '/app'
        console.log( `PWD (${__filename}) is ${PWD}`.red );
        console.log( `USER @ NAME is ${USER} @ ${NAME}`.red );
        console.log( `platform is ${os.platform()}, hostname is ${os.hostname()}`.cyan );
        console.log( colors.yellow( 'User Info : ', userInfo ), '\n' );
    });
}

