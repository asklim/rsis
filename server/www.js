const {
  app,
  databasesShutdown
} = require('./app-server');
const debug = require('debug')('rsisexpress:server');
const http = require('http');
const chalk = require('react-dev-utils/chalk');
const icwd = require('fs').realpathSync(process.cwd());

let version = require(`${icwd}/package.json`).version;

// пока работает только через 'npm run compile'
//import app from '../server/app-server';
//var debug = require('debug')('rsisexpress:server');
//import http from 'http';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val =>
{
  let port = parseInt(val, 10);
  if( isNaN(port) ) {  // named pipe
    return val;
  }
  if( port >= 0 ) {    // port number
    return port;
  }
  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error =>
{
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
};


const serverOutput = mode => 
{  
  switch (mode.toLowerCase()) {
    case 'full': 
      console.log('Express server= ',  server);
      return;
    case 'addr':
      // don't work on herokuapp.com: process.env.npm_package_version
      console.log('\tapp version ', chalk.cyan(version));
      console.log(
        'Express server= "' + server.address().address +
        '" Family= "' + server.address().family +'"\n',
        ' listening on port ' + server.address().port
      );       
      return;
    default:
      console.log('\n');
  }
};



/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3666');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.on('close', () => {
  console.log('http-server closing ....');
  }
);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

serverOutput('addr');//'full');


// CAPTURE APP TERMINATION / RESTART EVENTS

const serverClose = () => {
  // eslint-disable-next-line no-unused-vars
  return new Promise( (resolve, reject ) => {  
    server.close( () => {
      console.log('http-server closed now.');
      resolve();
    });
  });
};

// For nodemon restarts
process.once('SIGUSR2', () => {
    databasesShutdown('nodemon restart', 
      () => { 
        serverClose()
        .then( () => {
          process.kill( process.pid, 'SIGUSR2'); 
        });
    });
});

// For app termination
process.on('SIGINT', () => {
    databasesShutdown( 'app termination', 
      () => { 
        serverClose()
        .then( () => { process.exit(0); });
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    databasesShutdown( 'Heroku app termination', 
      () => {
        serverClose()
        .then( () => { process.exit(0); });
    });
});

