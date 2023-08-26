const { format } = require('util');
const UUID = require('uuid');
const {
    StatusCodes: HTTP,
    consoleLogger,
} = require('../../../../helpers');

//const debug = require('debug')('dbs:cfg:catalogLayouts');
const log = consoleLogger('db-cfg:catalog-layouts delete:');

const db = require('../../..').getDB('config');

const ModelCatalogLayouts = db.model('CatalogLayouts');


/**
 * Delete catalog-layout by uuid or ObjId
 * @returns
 * - statusCode 204 No Content & { message, uuid }
 * - statusCode 404 Not Found & message
 * - statusCode 500 Server Error & error object
 **/

module.exports = async function deleteById (catalogId) {


    const filtering = UUID.validate( catalogId )
        ? { uuid: catalogId }
        : { _id: catalogId };

    try {
        let doc;

        doc = await ModelCatalogLayouts.findOne( filtering );

        if( !doc ) {
            let msg = `Catalog-layout not found.`;
            return ({
                statusCode: HTTP.NOT_FOUND,
                logMessage: `${msg} w/filter: ` + format('%o', filtering ),
                response: msg
            });
        }

        /*
            При удалении документа doc, nextDoc считается неизменным, действующим
            с определенного момента (nextDoc.since), удаленный промежуток времени
            занимает prevDoc (увеличивается до nextDoc), как будто документа doc
            не существовало.
            Варианты:
                1. Есть и prevDoc и nextDoc (общий случай) - обновить 2 документа
                2. doc - первый документ (нет prevDoc) - обновить только nextDoc
                3. doc - последний документ (нет nextDoc) - обновить только prevDoc
                4. doc - единственный документ (нет prevDoc и nextDoc) - просто удалить
        */
        const prevId = doc.prev;
        const nextId = doc.next;

        if( prevId && nextId ) {
            //Вариант 1. обновляем оба (prev и next)
            const updateNext = {
                $set: { prev: prevId /* since: остается прежней */}
            };
            await ModelCatalogLayouts.findByIdAndUpdate( nextId, updateNext );

            const updatePrev = {
                $set: { next: nextId, until: doc.until /* must be EQ nextDoc.since */ }
            };
            await ModelCatalogLayouts.findByIdAndUpdate( prevId, updatePrev );
            log.info(`new link: ${prevId} -> ${nextId}`);

        }
        else if( nextId ) {
            //Вариант 2. Обновляем nextDoc
            // prevDoc отсутствует => nextDoc - первый в списке
            const update = {
                $set: { prev: null, since: null }
            };
            await ModelCatalogLayouts.findByIdAndUpdate( nextId, update );
            log.info(`new link: null -> ${nextId}`);

        }
        else if( prevId ) {
            //Вариант 3. Обновляем предыдущий документ prevDoc
            // nextDoc отсутствует => prevDoc - последний в списке
            const update = {
                $set: { next: null, until: null }
            };
            await ModelCatalogLayouts.findByIdAndUpdate( prevId, update );
            log.info(`new link: ${prevId} -> null`);
        }

        const { uuid } = await ModelCatalogLayouts.findOneAndDelete( filtering );

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
