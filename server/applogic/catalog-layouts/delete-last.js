const { format } = require( 'util' );

const {
    httpResponseCodes: HTTP,
    //consoleLogger,
} = require( '../../helpers' );

//const debug = require( 'debug' )( 'api:config:catalogLayouts' );
//const log = consoleLogger( 'api-config:' );

const db = require( '../../databases' ).getDB( 'config' );

const CatalogLayouts = db.model( 'CatalogLayouts' );



/**
 * Удаляет последний документ в связанном списке
 * и обновляет поля until, next у предыдущего документа
 * Delete last catalog-layout by client & list
 * @statusCode 204 No Content  & { uuid, message}
 * @statusCode 400 Bad Request & message
 * @statusCode 404 Not Found   & message
 * @statusCode 500 Server Error & error object
 **/

module.exports = async function deleteLast ({ client, list }) {


    if( !client && !list ) {
        // Если оба undefined - то ошибка
        return ({
            statusCode: HTTP.BAD_REQUEST,
            logMessage: 'calalog-layouts.deleteOne: No queryString specified.',
            response: 'Bad request. No queryString specified.'
        });
    }

    const finding = { client, list, until: { $eq: null } };

    try {
        const lastDoc = await CatalogLayouts.findOneAndDelete( finding );

        if( !lastDoc ) {
            let msg = `Catalog-layout not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg}\nwith finding: ` + format( '%o', finding ),
                response: msg 
            });
        }

        if( lastDoc.prev ) {
            // Это не единственный документ, есть предыдущий
            const update = {
                $set: { next: null, until: null }
            };
            await CatalogLayouts.findOneAndUpdate( { _id: lastDoc.prev }, update );
        }

        const { uuid } = lastDoc;
        return ({
            statusCode: HTTP.NO_CONTENT,
            logMessage: `SUCCESS: catalog-layout uuid:${uuid} deleted.`,
            response: {
                message: `catalog-layout uuid:${uuid} deleted successful.`,
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
};

