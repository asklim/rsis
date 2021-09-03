const {
    callbackError400,
    //callbackError405,
} = require( '../../../helpers' );

const
    handlerGET = require( './handler-get' ),
    handlerPOST = require( './handler-post' ),
    handlerPUT = require( './handler-put' ),
    handlerDELETE = require( './handler-delete' )
;


module.exports = function ( router ) {

    const reports = '/reports/daily';
    const reportsWithId = `${reports}/:reportId`;

    router.get( reportsWithId, handlerGET );
    router.put( reportsWithId, handlerPUT);
    router.delete( reportsWithId, handlerDELETE );

    router.get( reports, handlerGET );
    router.post( reports, handlerPOST );
    router.put( reports, handlerPUT);
    router.delete( reports, handlerDELETE );

    router.all( `${reports}/*`, callbackError400 );
};
