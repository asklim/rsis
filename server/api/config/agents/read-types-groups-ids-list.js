const debug = require('debug')('api:config:agents');
const {
    icwd,
    consoleLogger,
    send200Ok,
    send400BadRequest,
    send404NotFound,
    send500ServerError,
} = require('../../../helpers');

const log = consoleLogger('api-config:');

const db = require(`${icwd}/server/databases`).getDB('config');
const Agent = db.model('Agent');

const formatAgent = require('./format-agents-to-console');


/**
 * Return
 * (A)-type`s list or
 * (B)-group`s list { by type } or
 * (C)-id`s list { by type and/or group }
 * @usage
 * GET /api/config/agents?types
 * @usage
 * GET /api/config/agents?groups[&type=t]
 * @usage
 * GET /api/config/agents?ids&type=t[&group=g]
 */

module.exports = function readMetaValuesList (req, res) {


    console.log(
        'I: try read-meta-values config-agents document',
        '\nI: finding meta-values`s params:', req.params,
        '\nI: finding meta-values`s query:', req.query
    );

    if( !req.query ) {
        console.log('No query object for meta-values specified.');
        return send400BadRequest( res, 'No query object in request.');
    }

    const queryLength = Object.keys( req.query ).length;

    if( !queryLength ) {
        return send400BadRequest( res, 'No valid query params in request');
    }

    const PROJECTIONS = {
        'types':  { _id: 0, type: 1 },
        'groups': { _id: 0, group: 1 },
        'ids':    { _id: 0, id: 1 }
    };

    let selector;
    // Определяет какой тип списка возвращается
    // Соответствует полям в PROJECTIONS
    selector = Object.keys( req.query )[0];
    selector = selector && selector.toLowerCase();

    if( !( selector in PROJECTIONS )) {
        return send400BadRequest( res, 'No valid params in request');
    }

    let filtering = {}; // all values for meta-selector

    if( queryLength > 1 ) {

        const { type, group } = req.query;
        const typeCondition = new RegExp( type, 'i');
        const groupCondition = new RegExp( group, 'i');

        if( type ) {
            filtering = { ...filtering, 'type': typeCondition };
        }
        if( group ) {
            filtering = { ...filtering, 'group': groupCondition };
        }
    }

    const projection = PROJECTIONS[ selector ];

    debug('filtering:', filtering );
    debug('projection:', projection );

    Agent.find(
        filtering,
        projection,
        (err, agents) => {

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }
            if( !agents ) {
                return send404NotFound( res, 'agents not found.');
            }

            //debug('readAll:', Object.keys(agents));
            //debug('agents Before:', agents[0] );

            // единственное число от meta-selector:
            // ids->id, types->type, groups->group
            const fieldName = selector.substring( 0, selector.length-1 );
            const docs = uniqueValue( agents, fieldName );

            console.log( formatAgent( docs ));
            return send200Ok( res, docs);
        }
    );
};


function uniqueValue (arr, propName) {

    const arrSet = new Set();
    arr.forEach( (elem) => {
        arrSet.add( elem[ propName ] );
    });

    const result = [];
    arrSet.forEach( (elem) => {
        result.push( elem );
    });

    return result;
}
