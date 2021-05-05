const debug = require( 'debug' )( 'api:config:ping' );
const { 
    icwd, 
    //consoleLogger,
    send200Ok,
    send400BadRequest,
    send500ServerError,
} = require( '../../../helpers' );


let db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );

db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );


/** 
 * Отвечает сообщением для проверки работоспособности
 * приложения и базы данных
 * @usage
 * GET /api/config/ping/app or
 * GET /api/config/ping
 * return 200 {message : 'app'} - is Ok or nothing if app doesn't work  
 * 
 * GET /api/config/ping/mongocfg
 * GET /api/config/ping/mongosum
 * return 200 {message : 'nn'} - count of docs.   
 * return 404 {message : '-1'} - no Mongo
 **/

module.exports = function (req, res) {


    //params : {'app' | 'mongocfg' | 'mongosum'}
    let count = Object.keys( req.params ).length;
    debug( 'read-one: params: %O count: %d', req.params, count );
    //debug('ctrl.ROne: query: %O', req.query);  

    if( !count ) {
        // При отсутствии параметра: проверка приложения (app)    
        return send200Ok( res, 'app' );
    }

    let { pingId } = req.params;
    if( !pingId ) { 
        // req.params.* должен быть    
        return send400BadRequest( res, "req.params.pingId not present." );        
    }

    pingId = pingId.toLowerCase();

    if( pingId === 'app' ) {    
        return send200Ok( res, 'app' );
    }

    if( pingId === 'mongocfg' ) {
        return Agent.countDocuments(
            {}, 
            (err,count) => {
                if( err ) {
                    return send500ServerError( res, '-1' );                    
                }            
                return send200Ok( res, count.toString() );                
            }
        );        
    }

    if( pingId === 'mongosum' ) {
        return WeekNatural.countDocuments(
            {}, 
            (err,count) => {
                if( err ) {
                    return send500ServerError( res, '-1' );                    
                }            
                return send200Ok( res, count.toString() );                
            }
        );            
    }

    send400BadRequest( res );
};
