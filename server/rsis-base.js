
//const debug = require( 'debug' )('rsis:base');

const http = require( 'http' );
const herokuPinger = require( './heroku-no-sleep' );
const {
    createMongoDBConnections,
    databasesShutdown,
} = require( './databases' );


const log = require( './helpers' ).consoleLogger( '[rsis:base]' );

createMongoDBConnections();


const {
    app: rsisExpressApp,
} = require( './rsis-app.js' );

rsisExpressApp.getMyDB = function () {
    log.debug( 'Call from rsisExpressApp.getMyDB !!!!!!!!!!!!!!!' );
};

//debug( 'typeof getMyDB is', typeof rsisExpressApp.getMyDB );
//debug( rsisExpressApp.get('env')); // == NODE_ENV


/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort( process.env.PORT || '3067' );
rsisExpressApp.set( 'port', port );


const server = http.createServer( rsisExpressApp );


/**
 * Event listener for HTTP server "error" event.
 */
const handlerOnError = (err) => {

    if( err.syscall !== 'listen' ) {
        throw err;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch( err.code ) {

        case 'EACCES':
            log.error( bind + ' requires elevated privileges' );
            process.exit( 1 );
            break;

        case 'EADDRINUSE':
            log.error( bind + ' is already in use' );
            process.exit( 1 );
            break;

        default:
            log.log( `E: www-server unhandled error !!!`, err );
            //throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const handlerOnListening = () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    ;
    log.debug( `Server listening on ${bind}.` );
};


server.on( 'error', handlerOnError );

server.on( 'listening', handlerOnListening );

server.on( 'clientError', (_err, socket) => {

    socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
});

server.on( 'close', () => {

    console.log( 'http-server closing ....' );
    //ngrok.disconnect();
    //console.log( 'ngrok disconnected.' );
});

const EVERY_30_MINUTE = 30;
/** Закрытие pinger будет после закрытия server  */
herokuPinger( server, EVERY_30_MINUTE );

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(
    port,
    () => {
        serverAppOutput( 'addr'/*'full'*/, server );
    }
);


// *************************************************************
// CAPTURE APP TERMINATION / RESTART EVENTS

const shutdownTheServer = () => {
    return new Promise( (resolve) => {
        server.close( () => {
            console.log( 'http-server closed now.' );
            resolve();
        });
    });
};


process.once( 'SIGUSR2', async () => { // For nodemon restarts
    await shutdownTheServer();
    databasesShutdown(
        'SIGUSR2, nodemon restart',
        async () => {
            setTimeout( process.kill, 500, process.pid, 'SIGUSR2' );
        }
    );
});

const ZERO_EXIT_CODE = 0;

// For app termination
process.on( 'SIGINT', async () => {
    console.log( '\b\b\x20\x20' );
    console.log( 'Got SIGINT signal (^C)!\n' );
    const p = shutdownTheServer();
    //debug( 'shutdown returns', p ); // Promise { <pending> }
    await p;
    //debug( 'shutdown returns', p ); // Promise { undefined }
    await databasesShutdown(
        'SIGINT, app termination',
        () => {
            //const EXIT_DELAY = 0;
            //setTimeout( process.exit, EXIT_DELAY, ZERO_EXIT_CODE );
            process.exit( ZERO_EXIT_CODE );
        }
    );
    /** Если без setTimeout, то это никогда не будет выполнено */
    console.log( 'Exit from app.' );
});

// For Heroku app termination
process.on( 'SIGTERM', async () => {
    await shutdownTheServer();
    await databasesShutdown(
        'SIGTERM, app termination',
        async () => {
            setTimeout( process.exit, 500, ZERO_EXIT_CODE );
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

