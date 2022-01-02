const debug = require( 'debug' )( 'reports:week-natural' );

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

        Promise.resolve( createOne( req, res ))
        .then( () => {
            // Отсылаем ТОЛЬКО, если создано.
            debug( 'in rout-weeknatural router.post' );
            sendToWebApp( '/api' + route, req.body );
        });
    });

    router.put( route, (req, res) => {

        updateOne( req, res );
        debug( 'in rout-weeknatural router.put' );
        sendToWebApp( '/api' + route, req.body );
    });

    router.delete( routeWithWeekId, deleteOne );

    /* api for all records */
    //router.get(route, readListAll);
};

