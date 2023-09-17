
import {
    debugFactory,
    Logger,
    RsisExpress,
    Request,
    Response,
    send200Ok,
    send400BadRequest,
    send404NotFound,
} from '../../helpers/';

const log = new Logger('[api:processenv]');
const d = debugFactory('-api:processenv:');

// debug('log is', typeof log, log );
// api:processenv:handler-get log is object {
//    info: [Function: info],
//    warn: [Function: warn],
//    error: [Function: error]
// } +0ms

/**
 * Read a env variable from process.env by name
 * @usage GET /api/processenv?name=env_var_name
 * @usage GET /api/processenv/?name=env_var_name
 **/
export default async function hapi_processEnv_GET (
    req: Request,
    res: Response
) {
    try {
        d('req.query:', req.query );

        const app = req.app as RsisExpress;

        d('typeof req.app is', typeof app );  // function
        d('typeof getMyDB is', typeof app?.getMyDB );  // function
        //app.getMyDB();

        const count = (req?.params && Object.keys( req.params ).length) ?? 0;

        //log.info('handler-get - req.params:', req.params, 'count:', count );
        log.info('handler-get - req.query:', req.query );


        if ( count != 0 ) {
            // не должно быть
            send400BadRequest( res, '.params not allowed');
            return;
        }

        if ( !req?.query ) {
            // req.query должен быть
            send400BadRequest( res, '.query not present');
            return;
        }

        const { name } = req.query;

        if ( !name ) {
            // req.query.name должен быть
            send400BadRequest( res, '.name not present');
            return;
        }
        const key = name.toString();
        const envVarValue = process.env[ key ];

        log.info(`name: ${name} value: ${envVarValue}`);

        if ( !envVarValue ) {
            // Нет такой переменной в окружении
            send404NotFound( res, `not found ?name=${name}`);
            return;
        }

        send200Ok( res, {
            ok: true,
            name,
            value: envVarValue
        });
    }
    catch (err) {
        log.trace('catch, error:', err );
    }
};
