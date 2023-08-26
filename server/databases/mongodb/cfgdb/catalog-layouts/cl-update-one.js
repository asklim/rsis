
const debug = require('debug')('--dbs:cfg:catalogLayouts');
const UUID = require('uuid');
const {
    StatusCodes: HTTP,
} = require('../../../../helpers');

// const db = require(`${icwd}/server/databases`).getDB('config');
const databases = require('../../../index');
const db = databases.getDB('config');
const CatalogLayouts = db.model('CatalogLayouts');

//const log = consoleLogger('db-cfg:catalog-layouts update:');

/**
 * Update a catalog-layout by uuid or ObjId
 * @returns
 * - statusCode 200 OK & response= { message, uuid }
 * - statusCode 400 Bad Request & response= message
 * - statusCode 500 Server Error & response= error object
 */
module.exports = async function updateOne (catalogId, body) {

    const { xlGroups, items, host } = body;

    const filtering = UUID.validate( catalogId ) ?
        { uuid: catalogId }
        : { _id: catalogId };

    try {
        const $set = Object.assign({},{
            xlGroups, items,
            host,
            updatedAt: Date.now()
        });
        const $inc = { __v: 1 };

        debug('filtering:', filtering );

        const { uuid } = await CatalogLayouts.
            findOneAndUpdate( filtering, { $set, $inc }, { new: true } );

        debug('updated-doc`s uuid:', uuid );

        return ({
            statusCode: HTTP.OK,
            logMessage: `SUCCESS: catalog-layout uuid:${uuid} updated.`,
            response: {
                message: `catalog-layout uuid:${uuid} updated successful.`,
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
