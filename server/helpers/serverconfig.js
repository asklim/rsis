/* */
const dbName = {

    rsiscfg:  'rsiscfg',
    rsisdata: 'rsisdata',
    rsissum:  'rsissum',
    rsistmp:  'rsistmp',    
    //rsiswp:   'rsiswp',
    //rsiswc:   'rsiswc',
    //rsiswn:   'rsiswn'
};


const mongoURI = {

    DEV1:             "mongodb://192.168.0.240:27017",
    DEV2:             "mongodb://192.168.0.240:27016",
    STANDALONE:       "mongodb://192.168.0.240:36667",
    CLOUDDB_TEMPLATE: "mongodb://%s@rsis-shard-00-00-jjwdj.mongodb.net:27017,rsis-shard-00-01-jjwdj.mongodb.net:27017,rsis-shard-00-02-jjwdj.mongodb.net:27017/%s?ssl=true&replicaSet=rsis-shard-0&authSource=admin&retryWrites=true",
};


const API_SERVER_LOCAL = "http://192.168.0.240:3067";

let { PWD, DYNO } = process.env;
const isHeroku = DYNO && (PWD === '/app');

const icwd = require( 'fs' ).realpathSync( process.cwd() );

module.exports = {

    dbName,
    mongoURI,
    API_SERVER_LOCAL,
    isHeroku,
    icwd,

};
