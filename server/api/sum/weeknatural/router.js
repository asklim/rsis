const debug = require('debug')('reports:week-natural');

const { consoleLogger, } = require('../../../helpers');
const log = consoleLogger('[week-natural:api]');
const {
    StatusCodes: HTTP,
    shrinkServerRes,
} = require('../../../helpers');

const
    readOne = require('./read-one'),
    createOne = require('./create-one'),
    updateOne = require('./update-one'),
    deleteOne = require('./delete-one')
;

const { sendToWebApp } = require('../../../helpers/send-to-webapp');


/**
 * api for 1 week summary: /api/sum/weeknatural/<weekId>.
 * @property {Router} router - Express router
**/
module.exports = function sum_WeekNatural_router (
    router
) {
    const route = '/sum/weeknatural';
    const routeWithWeekId = route + '/:weekId';

    router.get( routeWithWeekId, readOne );

    router.post( route, async (req, res) => {
        try {
            const result = await createOne( req, res );

            debug('result from .post method\n', shrinkServerRes( result ));
            // Отсылаем ТОЛЬКО, если создано.
            log.debug('router.post - send To WebApp');
            if( result == HTTP.CREATED ) {
                sendToWebApp('/api' + route, req.body );
            }
        }
        catch (e) {
            log.warn('Error:', e );
        }
    });

    router.put( route, async (req, res) => {

        await updateOne( req, res );
        log.debug('router.put - send To WebApp');
        sendToWebApp('/api' + route, req.body );
    });

    router.delete( routeWithWeekId, deleteOne );

    /* api for all records */
    //router.get(route, readListAll);
};
