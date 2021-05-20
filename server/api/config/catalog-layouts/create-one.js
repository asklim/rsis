
const debug = require( 'debug' )( 'api:config:catalogLayouts' );
const { 
    icwd, 
    consoleLogger,
    send201Created,
    send400BadRequest,
    //send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'api-config:' );

const db = require( `${icwd}/server/databases` ).getDB( 'config' );
const CatalogLayouts = db.model( 'CatalogLayouts' );


/** 
 * Create a new catalog layout
 * @name createOne
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @usage
 * POST /api/config/catalog-layouts
 */

module.exports = async function createOne (req, res) {


    if( !req.body 
        || !Object.keys( req.body ).length ) {
        return send400BadRequest( res, 'Bad request, req.body is empty.' );
    }

    const { client, list, since } = req.body;
    log.info( `try create, config/catalog-layouts: client=${client}, list=${list}` );

    if( !client || !list ) {
        return send400BadRequest( res, 
            'Bad request, req.body.id required.'
        );
    }

    try {
        const lastdoc = await CatalogLayouts.findOne( { client, list, until: null } );
        const isoDatetime = (new Date).toISOString();
        req.body.since = since || isoDatetime;

        if( lastdoc ) {
            lastdoc.until = isoDatetime;
            req.body.prev = lastdoc._id;
        }
        else {
            req.body.prev = null;
        }

        const catalog = await CatalogLayouts.create( req.body );

        const { uuid } = catalog;
        if( lastdoc ) {
            lastdoc.next = catalog._id;
            let saved = await lastdoc.save();
            debug( `create-one: saved last doc objId: ${saved._id}` );
        }
        log.info( `SUCCESS: catalog-layout uuid:${uuid} created.` );

        return send201Created( res, 
            {
                message: `catalog-layout uuid:${uuid} created successful.`,
                uuid,
            } 
        );
    }
    catch (err) {
        log.error( err );
        return send500ServerError( res, err );
    }

};

