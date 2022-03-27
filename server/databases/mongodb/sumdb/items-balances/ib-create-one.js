const debug = require( 'debug' )( '-dbg:items-balances:db' );

const {
    httpResponseCodes: HTTP,
    makeResult,
    makeErrorResult,
} = require( '../../../../helpers' );


/**
 * Create a new ItemsBalance document
 * @returns
 * - statusCode 201 Created & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 409 Conflict & response= message
 * - statusCode 500 Server Error & response= error object
 */
module.exports = async function createOne (body) {

    const { filial, agent, creator, onDate } = body;

    try {
        const storage = this.getModel();

        const finded = await storage.findOne({ filial, agent, creator, onDate });

        if( finded ) {
            let msg = `[storage] ItemsBalance date:${onDate} for agent:${agent} from filial:${filial} by creator:${creator} exist.`;
            return makeResult( HTTP.CONFLICT, msg, msg );
        }

        const report = await storage.create( body );

        const { uuid } = report;
        //const uuid = '12345678-1234-1234-1234-123456789012';
        debug( `[create-one]: ${uuid}` );

        return makeResult(
            HTTP.CREATED,
            `[storage] ItemsBalance created (${uuid}).`,
            {
                message: `ItemsBalance created successful (${uuid}).`,
                uuid,
            }
        );
    }
    catch (err) {
        return makeErrorResult( err );
    }
};
