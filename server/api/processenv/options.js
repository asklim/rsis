const { 
    //icwd, 
    consoleLogger,
    send200Ok,
    //send400BadRequest,
    //send404NotFound,
} = require( '../../helpers' );

const log = consoleLogger( 'api-processenv:' );


/** 
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 * GET /api/config/processenv/?name=<var_name> 
 **/
module.exports = (req, res) => {

    log.info( 
        'options - params:', req && req.params,
        'count:', req && req.params && Object.keys( req.params ).length 
    );
    log.info( 'options - req.query: ', req && req.query );  

    send200Ok( res, 'method OPTIONS response');
};
