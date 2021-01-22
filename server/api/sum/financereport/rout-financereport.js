const debug = require( 'debug' )( 'api:sum:financereport' );

const {
    readOne,
    create,
    updateOne,
    deleteOne
} = require( './ctrl-financereport' );

//const icwd = require( 'fs' ).realpathSync( process.cwd() );
//const { sendToWebApp } = require( `${icwd}/server/helpers/send-to-webapp` );

/**  
 * @name rout-financereport
 * @description
 * api for financials summary by week/quarter.
 * @property {Router} router - Express router
 * @returns {} undefined
 * @example /api/sum/financereport[/<periodId>]
 * 
**/
module.exports = function ( router ) {


    let route = '/sum/financereport';
    let routeWithPeriodId = route + '/:periodId';
    
    router.get( routeWithPeriodId, readOne );

    router.post( route, (req, res) => {

        Promise.resolve( create( req, res ) ) //;
        .then( () => {

            debug('in rout-financereport router.post');
            //sendToWebApp( '/api' + route, req.body );
        });
    });

    router.put( route, (req, res) => {
        
        updateOne( req, res );
        debug( 'in rout-financereport router.put' );
        //sendToWebApp( '/api' + route, req.body );
    });

    router.delete( routeWithPeriodId, deleteOne );
    
    /* api for all records */
    //router.get(route, readListAll);
};

