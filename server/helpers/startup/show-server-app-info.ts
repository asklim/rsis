// import type { RsisExpress } from '../../types';

import { Server } from 'node:http';
import { AddressInfo } from 'node:net';

import /*colors,*/ { gray, cyan } from 'colors';

import {
    IConsoleLogger,
    env,
    packageVersion
} from '<ssrv>/helpers/';

/**
 * Выводит информацию о сервере и его окружении в консоль
 *
 */
export default function showServerAppInfo (
    httpServer: Server,
    logger: IConsoleLogger = console
) {
    const mode = env.NODE_ENV ?? 'undefined';
    logger.info( gray('process pid:'), cyan(''+process.pid ));
    logger.info('NODE Environment is', mode.cyan );
    logger.info( getAddressInfo( httpServer ), '\n');
    logger.info('package version', packageVersion.cyan, '\n');
    // logger.log('Express server =', httpServer, '\n');
}


function getAddressInfo (
    server: Server
) {
    const serverAddress = server.address() ?? {};
    const {
        address: _a,
        family: _f,
        port
    } = <AddressInfo> serverAddress;

    const bind = typeof serverAddress == 'string' ?
        `pipe ${serverAddress}`
        : `port ${port}`;

    return (
        `ExpressAddress="${cyan( _a )}" family="${cyan( _f )}" listening on ${cyan( bind )}`
    );
}
