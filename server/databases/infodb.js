const logdebug = require('debug')('--temp:dbs:infodb' );
const debug = (...args) => logdebug( '\b:[info]', ...args );

const { formatWithOptions } = require( 'util' );
const { consoleLogger, } = require( '../helpers' );

module.exports.log = async function (mongooseConnection) {

    //debug( `Mongoose version ${mongooseConnection.base.version}` );

    const { host, port, db, id } = mongooseConnection;
    debug( `Mongoose connection id: ${id}` );

    const title = `dbinfo: ${host}:${port}/${db.databaseName}`;
    const log = consoleLogger( `[${title}]` );

    async function * theModels( models ) {
        for( let modelName of models ) {
            yield mongooseConnection.model( modelName );
        }
    }

    try {
        const models = mongooseConnection.modelNames().sort();
        //массив имен моделей (Строки)
        //debug( `${title}: model's count = ${models.length}` );
        //debug( `${title}:`, models );

        const infoDocs = [];
        for await( let theModel of theModels( models )) {
            let count = await theModel.countDocuments({});
            infoDocs.push([ theModel.modelName, count ]);
        }

        logging( infoDocs, log, 'v2' );
    }
    catch (error) {
        console.log( 'infodb.js - catch block');
        log.error( error );
    }

};


function logging (docs, logger, version = 'v1') {

    if( !Array.isArray( docs )) {
        throw new Error(`infodb.logging: 'docs' must be an Array.`);
    }

    if( version == 'v2' ) {
        if( docs.length ) {
            docs.forEach( (el) => logger.info( el ));
        }
        else {
            logger.info(`DB has no collections.`);
        }
    }
    else {
        logger.info('\n',
            formatWithOptions( { colors: true }, '%O', docs )
        );
    }
}
