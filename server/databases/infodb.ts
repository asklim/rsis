import { Connection } from 'mongoose';
import { formatWithOptions } from 'node:util';
import {
    IConsoleLogger,
    Logger,
    debugFactory
} from '../helpers';

const logdebug = debugFactory('--temp:dbs:infodb');
const d = (...args) => logdebug('\b:[info]', ...args );

export async function log (
    mongooseConnection: Connection
) {

    //d(`Mongoose version ${mongooseConnection.base.version}`);

    const { host, port, db, id } = mongooseConnection;
    d(`Mongoose connection id: ${id}`);

    const title = `dbinfo: ${host}:${port}/${db.databaseName}`;
    const log = new Logger(`[${title}]`);

    async function * theModels(
        models: string[]
    ) {
        for( const modelName of models ) {
            yield mongooseConnection.model( modelName );
        }
    }

    try {
        const models = mongooseConnection.modelNames().sort();
        //массив имен моделей (Строки)
        //debug(`${title}: model's count = ${models.length}`);
        //debug(`${title}:`, models );

        const infoDocs: [string, number][] = [];
        for await ( const theModel of theModels( models )) {
            const count = await theModel.countDocuments({});
            infoDocs.push([ theModel.modelName, count ]);
        }

        infoDocsLogging( infoDocs, log );
    }
    catch (error) {
        console.log('infodb.ts - catch block');
        log.error( error );
    }

};


function infoDocsLogging (
    docs: [string, number][],
    logger: IConsoleLogger,
    version: string = 'v2'
) {
    // if ( !Array.isArray( docs )) {
    //     throw new Error(`infodb.logging: 'docs' must be an Array.`);
    // }

    if ( version === 'v2') {
        if( docs.length ) {
            for( const el of docs ) {
                logger.info( el );
            }
        }
        else {
            logger.info(`DB has no collections.`);
        }
    }
    else {
        logger.info('\n',
            formatWithOptions( { colors: true }, '%O', docs )
        );
    }
}
