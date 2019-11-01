const mongoose = require('mongoose');
const util = require('util');

const { 
  dbName,
  mongoURI } = require('../../config/enumvalues');

var gracefulShutdown;
var dbURI;

if (process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'intranet') {
    dbURI = util.format(mongoURI.CLOUDDB_TEMPLATE,
        process.env.ATLAS_CREDENTIALS,
        dbName.rsiscfg
    );

} else {
   dbURI = mongoURI.DEV2+'/'+dbName.rsiscfg;
    //dbURI = mongodb://hp8710w:27016/rsiscfg; 
}

mongoose.connect(dbURI, { useNewUrlParser: true,
                          useCreateIndex : true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
//require('./locations');
//require('./users');

var salePlaceSchema = require('../../api/models/saleplaces');
mongoose.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

var stafferSchema = require('../../api/models/staffers');
mongoose.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
