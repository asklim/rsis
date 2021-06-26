
const debug = require( 'debug' )( 'api:config:catalogLayouts' );
const { 
    icwd,
    httpResponseCodes: HTTP,
} = require( '../../helpers' );

const db = require( `${icwd}/server/databases` ).getDB( 'config' );
const CatalogLayouts = db.model( 'CatalogLayouts' );


/** 
 * Create a new catalog-layout at end of linked list
 * @returns
 * @statusCode 201 Created & { message, uuid }
 * @statusCode 400 Bad Request & message
 * @statusCode 500 Server Error & error object
 */

module.exports = async function createOne (body) {


    const { client, list, since } = body;

    if( !client || !list ) {
        return ({
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.createOne: No body.client or body.list.',
            response: 'Bad request, No body.client or body.list.'
        });
    }

    //const session = await db.startSession();
    // Транзакции не работают на обычных базах ???
    // А только на ReplicaSet или ShardedCluster
    try {
        let catalog;
        //await session.withTransaction( async () => {

        const lastdoc = await CatalogLayouts.findOne({ client, list, until: null })
        //    .session( session )
        ;
        const isoDatetime = (new Date).toISOString();
        body.since = since || isoDatetime;

        if( lastdoc ) {
            lastdoc.until = isoDatetime;
            body.prev = lastdoc._id;
        }
        else {
            body.prev = null;
        }

        catalog = await CatalogLayouts.create( body );
        //catalog = await CatalogLayouts.create([ req.body ], { session: session });

        if( lastdoc ) {
            lastdoc.next = catalog._id;
            let saved = await lastdoc.save();
            debug( `create-one: saved last doc objId: ${saved._id}` );
        }
        //});

        const { uuid } = catalog;
        //const uuid = '12345678-1234-1234-1234-123456789012';
        //debug( `create-one: test-uuid ${uuid}` );

        //session.endSession();
        return ({
            statusCode: HTTP.CREATED,
            logMessage: `SUCCESS: catalog-layout uuid:${uuid} created.`,
            response: {
                message: `catalog-layout uuid:${uuid} created successful.`,
                uuid,
            }
        });
    }
    catch (err) {
        return ({
            statusCode: HTTP.INTERNAL_SERVER_ERROR,
            logMessage: err.message,
            response: err
        });
    }
    finally {
        debug('create-one :: finally');
        //session.endSession();
    }

};

