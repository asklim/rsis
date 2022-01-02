const debug = require( 'debug' )( 'api:health:' );
const {
    send200Ok,
    send400BadRequest,
    send500ServerError,
} = require( '../../helpers' );


const cfgdb = require( '../../databases' ).getDB( 'config' );
const sumdb = require( `../../databases` ).getDB( 'sum' );


/**
 * Отвечает сообщением для проверки работоспособности
 * приложения и базы данных
 * @usage GET /api/health/app
 * @usage or GET /api/health
 * @returns 200 {message : 'app'} - is Ok or nothing if app doesn't work
 *
 * @usage GET /api/health/databases
 * @returns 200 {ok: true, dbname: docsCount}
 * @returns 500 {ok: false, dbname: docsCountResult}
 *
 * @usage GET /api/health/mongocfg
 * @usage GET /api/health/mongosum
 * @returns 200 {message : 'nn'} - count of docs.
 * @returns 500 {message : '-1'} - no Mongo
 **/

module.exports = async function (req, res) {


    //params.pingId : {'app' | 'databases' | 'mongocfg' | 'mongosum'}
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


    if( pingId === 'mongocfg' ) {
        try {
            const count = await totalDocumentsInDB( cfgdb );
            return send200Ok( res, count.toString() );
        }
        catch {
            return send500ServerError( res, '-1' );
        }
    }


    if( pingId === 'mongosum' ) {
        try {
            const count = await totalDocumentsInDB( sumdb );
            return send200Ok( res, count.toString() );
        }
        catch {
            return send500ServerError( res, '-1' );
        }
    }


    if( pingId === 'databases' ) {

        let cfgCount;
        let sumCount;
        try {
            cfgCount = await totalDocumentsInDB( cfgdb );
            sumCount = await totalDocumentsInDB( sumdb );
            return send200Ok( res,
                {
                    ok: true,
                    mongocfg: cfgCount,
                    mongosum: sumCount
                }
            );
        }
        catch {
            return send500ServerError( res,
                {
                    ok: false,
                    mongocfg: cfgCount,
                    mongosum: sumCount
                }
            );
        }
    }

    send400BadRequest( res, `parameter '${pingId}' is invalid.` );
};




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
