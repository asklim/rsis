const debug = require( 'debug' )( 'api:processenv:' );
const {
    //icwd,
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
} = require( '../../helpers/' );

const log = consoleLogger( 'api:processenv' );

// debug( 'log is', typeof log, log );
// api:processenv:handler-get log is object {
//    info: [Function: info],
//    warn: [Function: warn],
//    error: [Function: error]
// } +0ms
//console.log( 'console.log - api/processenv/handler-get [initialize]' );

/**
 * Read a env variable from process.env by name
 * @usage GET /api/processenv?name=env_var_name
 * @usage GET /api/processenv/?name=env_var_name
 **/
module.exports = async function handler_GET (
    req,
    res
) {
    debug( 'req.query:', req.query );
    //console.log( 'console.log - api/processenv/handler-get [handler]' );

    log.info(
        'handler-get - req.params:', req.params,
        'count:', req.params && Object.keys( req.params ).length
    );
    log.info( 'handler-get - req.query:', req.query );

    const count = req.params
        ? Object.keys( req.params ).length
        : 0
    ;

    if( count !== 0) {
        // не должно быть
        return send400BadRequest( res, '.params not allowed' );
    }

    if( !req.query ) {
        // req.query должен быть
        return send400BadRequest( res, '.query not present' );
    }

    const { name } = req.query;

    if( !name ) {
        // req.query.name должен быть
        return send400BadRequest( res, '.name not present' );
    }

    const envVarValue = process.env[ name ];

    log.info( `name: ${name} value:`, envVarValue );

    if( !envVarValue ) {
        // Нет такой переменной в окружении
        return send404NotFound( res, 'invalid .name' );
    }

    send200Ok( res, {
        ok: true,
        name,
        value: envVarValue
    });
};
