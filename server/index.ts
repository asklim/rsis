#!/usr/bin/env node
import {
    env,
    Logger
} from './helpers';

import {
    isAppRunning,
    showStartSystemInfo
} from './helpers/startup';

Logger.setLevel( env.isProduction );
const initLog = new Logger('[rsis:index]:');


initLog.warn('Start of prepare section.');

(async (log) => {
    if( await isAppRunning( env.PORT, initLog )) {
        log.warn('App has already been launched.');
        process.exit( 1 );
    }
    await showStartSystemInfo();
    const { startServer } = await import ('./rsis-base');
    startServer();

    log.info('=============================');
    log.info('=  End of prepare section.  =');
    log.info('=============================');
})( initLog );
