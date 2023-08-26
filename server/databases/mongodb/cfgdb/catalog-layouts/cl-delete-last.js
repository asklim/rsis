const { format } = require('util');

const {
    StatusCodes: HTTP,
    consoleLogger,
} = require('../../../../helpers');

const debug = require('debug')('dbs:cfg:catalogLayouts deleteLast:');
const log = consoleLogger('db-cfg:catalogLayouts delete:');

const db = require('../../..').getDB('config');

const ModelCatalogLayouts = db.model('CatalogLayouts');



/**
 * Удаляет последний документ в связанном списке
 * и обновляет поля until, next у предыдущего документа
 * Delete last catalog-layout by client & list
 * @returns
 * - statusCode 204 No Content  & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 404 Not Found & response= message
 * - statusCode 500 Server Error & response= error object
 **/
module.exports = async function deleteLast ({ client, list }) {

    const filtering = { client, list, until: { $eq: null } };

    try {
        const lastDoc = await ModelCatalogLayouts.findOneAndDelete( filtering );

        debug('lastDoc uuid', lastDoc?.uuid );

        if( !lastDoc ) {
            let msg = `Catalog-layout not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg} w/filter: ` + format('%o', filtering ),
                response: msg
            });
        }

        if( lastDoc.prev ) {
            // Это не единственный документ, есть предыдущий
            const update = {
                $set: { next: null, until: null }
            };
            await ModelCatalogLayouts.findByIdAndUpdate( lastDoc.prev, update );
        }

        const { uuid, prev } = lastDoc;
        log.info(`new link: ${prev} -> null`);

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
            // @ts-ignore
            logMessage: err.message,
            response: err
        });
    }
};
