
const readOne = require( './read-one' );
const { callbackError405 } = require( '../../../helpers' );
// Метод запроса не разрешен к использованию для данного URL


/**  
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * GET /api/config/ping/mongo
 */

module.exports = function ( router ) {

    const pingPath = '/config/ping';
    const pingPathWithId = `${pingPath}/:pingId`;
  
    router.get( pingPath, readOne );
    router.all( pingPath, callbackError405 );
    router.get( pingPathWithId, readOne );
    router.all( pingPathWithId, callbackError405 );
    //router.put( pingPathWithId, callbackError405 );
    //router.delete( pingPathWithId, callbackError405 );
  
};
