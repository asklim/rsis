const debug = require( 'debug' )( 'reports:week-natural' );

const { consoleLogger, } = require( '../../../helpers' );
const log = consoleLogger( '[week-natural:api]' );
const {
    httpResponseCodes: HTTP,
} = require( '../../../helpers' );

const
    readOne = require( './read-one' ),
    createOne = require( './create-one' ),
    updateOne = require( './update-one' ),
    deleteOne = require( './delete-one' )
;

const { sendToWebApp } = require( '../../../helpers/send-to-webapp' );


/**
 * @name rout-weeknatural
 * @description
 * api for 1 week summary: /api/sum/weeknatural/<weekId>.
 * @property {Router} router - Express router
 * @returns {} undefined
 *
 *
**/

module.exports = function (router) {


    const route = '/sum/weeknatural';
    const routeWithWeekId = route + '/:weekId';

    router.get( routeWithWeekId, readOne );

    router.post( route, (req, res) => {

        /*Promise.resolve(*/ createOne( req, res ).
        then( (result) => {
            debug( 'result from .post', result );
            // Отсылаем ТОЛЬКО, если создано.
            log.debug( 'router.post - send To WebApp' );
            if( result == HTTP.CREATED ) {
                sendToWebApp( '/api' + route, req.body );
            }
        }).
        catch( (e) => {
            log.warn( 'Error:', e );
        });
    });

    router.put( route, (req, res) => {

        updateOne( req, res );
        log.debug( 'router.put - send To WebApp' );
        sendToWebApp( '/api' + route, req.body );
    });

    router.delete( routeWithWeekId, deleteOne );

    /* api for all records */
    //router.get(route, readListAll);
};

