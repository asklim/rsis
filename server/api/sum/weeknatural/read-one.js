//const debug = require('debug')('reports:week-natural');
const {
    icwd,
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('[week-natural:api:h-GET]');

const db = require(`${icwd}/server/databases`).getDB('sum');
const WeekNatural = db.model('WeekNatural');


/**
 * Read a week summary Natural info
 * by the XXI century weekId or 'last'
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @usage
 * GET /api/sum/weeknatural/:weekId
 * @example
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/1011
 * GET /api/sum/weeknatural/last
**/
const readOne = async (
    req,
    res
) => {
    console.log(
        `I: try readOne sum-week-natural document`,
        `\nI: finding weekNatural's params:`, req.params,
        `\nI: finding weekNatural's query :`, req.query
    );

    const { weekId } = req.params;

    if( !req.params || !weekId ) {
        log.warn('weekNatural.readOne: No weekId specified.');
        send400BadRequest( res, 'No weekId in request.');
        return;
    }

    let finding, sorting, weekNumber;

    if( weekId.toLowerCase() === 'last') {

        finding = {};
        sorting = { id: -1 };
    }
    else {

        weekNumber = Number.parseInt( weekId, 10 );
        if( !weekNumber ) {

            log.warn('weekNatural.readOne: wrong weekId specified.');
            send400BadRequest( res, 'Wrong weekId in request.');
            return;
        }

        finding =  { id: weekNumber };
        sorting =  {};
    }


    WeekNatural.
        find( finding ).
        sort( sorting ).
        limit(1).
        exec( (err, docs) => {

            if( err ) {
                log.error( err );
                send500ServerError( res, err );
                return;
            }

            if( !docs || docs.length < 1 ) {

                let msg = `Summary data for week ${weekId}/${weekNumber} not found.`;
                log.warn(`weekNatural ${msg}`);

                send404NotFound( res, `WeekNatural ${msg}`);
                return;
            }

            log.info(`SUCCESS: weekNatural ${docs[0].id} readOne is Ok.`);
            send200Ok( res, docs[0] );
            return;
        })
    ;
};

module.exports = readOne;
