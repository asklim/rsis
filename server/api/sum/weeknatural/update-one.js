//const debug = require('debug')('reports:week-natural');
const {
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('[week-natural:api:h-PUT]');

// const db = require(`${icwd}/server/databases`).getDB('sum');
const databases = require('../../../databases/index');
const db = databases.getDB('sum');
const WeekNatural = db.model('WeekNatural');


/**
 * Update week Natural summary
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @example
 * PUT /api/sum/weeknatural
**/
const updateOne = async (
    req,
    res
) => {
    if( !req.body
        || Object.keys( req.body ).length == 0 ) {
        send400BadRequest( res, 'Bad request, body is empty');
        return;
    }

    const weekNumber  = Number.parseInt( req.body.id, 10 ); // or NaN

    if( !weekNumber ) {
        send400BadRequest( res, 'Bad request, body.id is required or wrong.');
        return;
    }

    WeekNatural.
        find( { id: weekNumber } ).
        limit( 1 ).
        exec( (err, docs) => {

            if( err ) {
                log.error( err );
                send500ServerError( res, err );
                return;
            }

            if( !docs || docs.length < 1 ) {
                send404NotFound( res,
                    `Summary data for week ${weekNumber} not found.`
                );
                return;
            }

            Object.assign(
                docs[0],
                req.body,
                { updatedAt: Date.now() }
            );
            //doc[0].host = req.body.host;
            //debug(`weekNatural doc.isNew: ${docs[0].isNew}.`);//false

            docs[0].
            save( (err, savedDoc) => {

                if( err ) {
                    return send500ServerError( res, err );
                }

                log.info(`SUCCESS: weekNatural ${savedDoc.id} updated.`);
                send200Ok( res, savedDoc );
                return;
            });
        });
};


module.exports = updateOne;
