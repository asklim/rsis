
const { 
    callbackError400,
    //callbackError405,
} = require( '../../../helpers' );

const 
    handlerGET = require( './handler-get' ),
    handlerPOST = require( './handler-post' ),
    handlerPUT = require( './handler-put' ),
    handlerDELETE = require( './handler-delete' ),
    handlerPOST_WITH_ACTION = require( './handler-post-id-action' )
;


module.exports = function ( router ) {

    const catalog = '/config/catalog-layout';
    const catalogs = `${catalog}s`;
    const catalogsWithId = `${catalogs}/:catalogId`;
    const catalogsWithIdAndAction = `${catalogs}/:catalogId/:action`;

    router.post( catalogsWithIdAndAction, handlerPOST_WITH_ACTION );
    router.get( catalogsWithId, handlerGET );
    router.delete( catalogsWithId, handlerDELETE );

    router.get( catalogs, handlerGET );
    router.post( catalogs, handlerPOST );
    router.put( catalogs, handlerPUT /*callbackError405*/);
    router.delete( catalogs, handlerDELETE );


    router.all( `${catalog}/*`, callbackError400 );
    router.all( `${catalogs}/*`, callbackError400 );
};
