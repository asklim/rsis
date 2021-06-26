
const { 
    callbackError400,
    callbackError405,
} = require( '../../../helpers' );

const 
    handlerGET = require( './handler-get' ),
    handlerPOST = require( './handler-post' ),
    handlerDELETE = require( './handler-delete' )
;

const catalog = '/config/catalog-layout';

module.exports = function ( router ) {

    const catalogs = `${catalog}s`;
    const catalogsWithId = `${catalogs}/:catalogId`;

    router.get( catalogsWithId, handlerGET );

    router.get( catalogs, handlerGET );
    router.post( catalogs, handlerPOST );
    router.put( catalogs, callbackError405 );
    router.delete( catalogs, handlerDELETE );


    router.all( `${catalog}/*`, callbackError400 );
    router.all( `${catalogs}/*`, callbackError400 );
};
