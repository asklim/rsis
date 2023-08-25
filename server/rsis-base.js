//const dbgTest = require('debug')('rsis:base:test');

const http = require('http');
const {
    createMongoDBConnections,
    databasesShutdown,
} = require('./databases');


const log = require('./helpers').consoleLogger('[rsis:base]');

createMongoDBConnections();


const { app: rsisExpressApp, } = require('./rsis-app.js');

//debug('typeof getMyDB is', typeof rsisExpressApp.getMyDB );
//debug( rsisExpressApp.get('env')); // == NODE_ENV


/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort( process.env.PORT ?? '3067');
rsisExpressApp.set('port', port );


const server = http.createServer( rsisExpressApp );


/**
 * Event listener for HTTP server "error" event.
 */
const handlerOnError = (err) => {

    if( err.syscall !== 'listen') {
        throw err;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch( err.code ) {

        case 'EACCES':
            log.error(`${bind} requires elevated privileges.`);
            process.exit( 1 );
            break;

        case 'EADDRINUSE':
            log.error(`${bind} is already in use.`);
            process.exit( 1 );
            break;

        default:
            log.log(`[ERR!] www-server unhandled error !!!`, err );
            //throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const handlerOnListening = () => {
    const _a = server.address();
    const addr = _a ?? typeof( _a );
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    ;
    log.debug(`Server listening on ${bind}.`);
};


server.on('error', handlerOnError );

server.on('listening', handlerOnListening );

server.on('clientError', (_err, socket) => {

    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('close', () => {

    console.log('http-server closing ...');
    rsisExpressApp.emit('close');
    //ngrok.disconnect();
    //console.log('ngrok disconnected.');
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(
    port,
    () => serverAppOutput('addr'/*'full'*/, server )
);


// *************************************************************
// CAPTURE APP TERMINATION / RESTART EVENTS

async function shutdownTheServer () {
    return server.
    close( (err) => {
        if( err ) {
            console.log('Error of closing server.\n', err );
            return;
        }
        console.log('http-server closed now.');
    });
}

process.once(
    'SIGUSR2', // For nodemon restarts
    async () => {
        await shutdownTheServer();
        databasesShutdown(
            'SIGUSR2, nodemon restart',
            async () => {
                setTimeout( process.kill, 500, process.pid, 'SIGUSR2');
            }
        );
    }
);


const OK_EXIT_CODE = 0;
const clearTwoChar = '\b\b\x20\x20';

process.on( // For app termination
    'SIGINT',
    async () => {
        console.log(`${clearTwoChar}\nGot SIGINT signal (^C)!\n`);
        const p = shutdownTheServer();
        //debug('shutdown returns', p ); // Promise { <pending> }
        await p;
        //debug('shutdown returns', p ); // Promise { undefined }
        await databasesShutdown(
            'SIGINT, app termination'
            , () => {
                //const EXIT_DELAY = 0;
                //setTimeout( process.exit, EXIT_DELAY, ZERO_EXIT_CODE );
            }
        );
        /** Если без setTimeout, то это никогда не будет выполнено */
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
        full: () => console.log('Express server = ',  httpServer, '\n'),
        addr: () => {
            console.log(
                'Express server = "' + address.cyan
                + '" Family= "' + family.cyan
                + '" listening on ' + bind.cyan, '\n'
            );
        },
        default: () => console.log('\n')
    };

    (outputs[ outputMode.toLowerCase() ] || outputs[ 'default' ])();
}
