const debug = require( 'debug' )( 'api:health:handler-get' );
const {
    send200Ok,
    send400BadRequest,
    send500ServerError,
} = require( '../../helpers' );


const cfgdb = require( '../../databases' ).getDB( 'config' );
const sumdb = require( `../../databases` ).getDB( 'sum' );


/**
 * @param mongodb - Mongoose.Connection to db
 * @returns count documents in db for all collections
 **/
async function totalDocumentsInDB (mongodb) {

    let total = 0;
    for( let name of mongodb.modelNames() ) {

        let theModel = mongodb.model( name );
        let count = await theModel.estimatedDocumentCount();
        total += count;
    }
    return total;
}


/**
 * Отвечает сообщением для проверки работоспособности
 * приложения и базы данных
 * @usage GET /api/health/app
 * @usage or GET /api/health
 * @returns 200 {message : 'app'} - is Ok or nothing if app doesn't work
 *
 * @usage GET /api/config/ping/mongocfg
 * @usage GET /api/config/ping/mongosum
 * @returns 200 {message : 'nn'} - count of docs.
 * @returns 404 {message : '-1'} - no Mongo
 **/

module.exports = async function (req, res) {


    //params.pingId : {'app' | 'mongocfg' | 'mongosum'}
    let count = Object.keys( req.params ).length;
    debug( 'params: %O count: %d', req.params, count );
    //debug('query: %O', req.query);

    if( !count ) {
        // При отсутствии параметра: проверка приложения (app)
        return send200Ok( res, 'app--' );
    }

    let { pingId } = req.params;
    if( !pingId ) {
        // req.params.* должен быть
        return send400BadRequest( res, 'req.params.pingId not present.' );
    }

    pingId = pingId.toLowerCase();

    if( pingId === 'app' ) {
        return send200Ok( res, 'app++' );
    }

    try {

        if( pingId === 'mongocfg' ) {

            const count = await totalDocumentsInDB( cfgdb );
            return send200Ok( res, count.toString() );
        }

        if( pingId === 'mongosum' ) {

            const count = await totalDocumentsInDB( sumdb );
            return send200Ok( res, count.toString() );
        }

        send400BadRequest( res );
    }
    catch {
        return send500ServerError( res, '-1' );
    }
};
