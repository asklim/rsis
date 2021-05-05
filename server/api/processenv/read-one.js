const { 
    //icwd, 
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
} = require( '../../helpers' );

const log = consoleLogger( 'api-processenv:' );


/** 
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 * GET /api/config/processenv/?name=<var_name> 
 **/
module.exports = (req, res) => {

    log.info( 
        'readOne - params:', req && req.params,
        'count:', req && req.params && Object.keys( req.params ).length 
    );
    log.info( 'readOne - req.query: ', req && req.query );  

    const count = req && req.params
        ? Object.keys( req.params ).length
        : 0
    ;

    if( count !== 0) { 
        // не должно быть
        return send400BadRequest( res, ".params not allowed" );
    }
    
    if( !req.query ) {
        // req.query должен быть    
        return send400BadRequest( res, ".query not present" );
    }
    
    const { name } = req.query;

    if( !name ) { 
        // req.query.name должен быть
        return send400BadRequest( res, ".name not present" );
    }
    
    const envVarValue = process.env[ name ];
    
    log.info( `name: ${name} value:`, envVarValue );

    if( !envVarValue ) { 
        // Нет такой переменной в окружении
        return send404NotFound( res, "invalid .name" );
    }
    
    send200Ok( res, { 'value': envVarValue });
};
