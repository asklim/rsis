const {
    callbackError400,
    //callbackError405
} = require('../../../helpers');


const handlerGET = require( './handler-get' );
const handlerPOST = require( './handler-post' );
const handlerPUT = require( './handler-put' );
const handlerDELETE = require('./handler-delete' );


module.exports = async function ( router ) {

    const route = '/registr/items-balances';
    const routeWithId = `${route}/:documentId`;

    router.get( routeWithId, handlerGET );
    router.put( routeWithId, handlerPUT);
    router.delete( routeWithId, handlerDELETE );

    router.get( route, handlerGET );
    router.post( route, handlerPOST );
    router.put( route, handlerPUT);
    router.delete( route, handlerDELETE );

    router.all( `${route}/*`, callbackError400 );
};

