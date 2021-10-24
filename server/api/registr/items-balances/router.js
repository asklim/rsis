const {
    callbackError400,
    //callbackError405
} = require('../../../helpers');

//import { resolve } from 'path';
//import { existsSync } from 'fs';


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

/*
async function defaultHandler (id) {
    const handler = await import( id );
    console.log('defaultHandler typeof', typeof handler ); //object
    return handler || callbackError405;
}*/


/*
function Nodejs_defaultHandler (id) {
    const filepath = resolve( __dirname, id );
    console.log( 'items-balances router', filepath );
    // /mnt/e/code/rsis/server/api/registr/items-balances/handler-get
    let handler;
    if( existsSync( filepath )) {
        // НЕ РАБОТАЕТ: остается callbackError405
        handler = require( id );
    }
    return handler || callbackError405;
}*/
