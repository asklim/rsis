const debug = require( 'debug' )( 'reports:finance' );

const
    createOne = require( './create-one' ),
    readOne = require( './read-one' ),
    updateOne = require( './update-one' ),
    deleteOne = require( './delete-one' )
;

//const sendToWebApp = require( '../../../helpers/send-to-webapp' );


/**
 * @name rout-financereport
 * @description
 * api for financials summary by week/quarter.
 * @property {Router} router - Express router
 * @returns {} undefined
 * @example /api/sum/financereport[/<periodId>]
 *
**/
module.exports = function (router) {


    let route = '/sum/financereport';
    let routeWithPeriodId = route + '/:periodId';

    router.get( routeWithPeriodId, readOne );

    router.post( route, (req, res) => {

        Promise.resolve( createOne( req, res ) ) //;
        .then( () => {

            debug( 'in rout-financereport router.post' );
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

