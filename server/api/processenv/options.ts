import {
    Logger,
    send200Ok,
    //send400BadRequest,
    //send404NotFound,
} from '../../helpers/';

const log = new Logger('api-processenv:');


/**
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name>
 * GET /api/config/processenv/?name=<var_name>
 **/
export default function hapi_processEnv_OPTIONS (
    req: any,
    res: any
) {
    const count = (req?.params && Object.keys( req.params ).length) ?? 0;

    log.info(
        'options - params:', req?.params,
        `\ncount: ${count}`
    );
    log.info('options - req.query: ', req?.query );

    send200Ok( res, 'method `OPTIONS` response');
};
