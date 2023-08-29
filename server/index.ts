#!/usr/bin/env node
import {
    env,
    version,
    Logger
} from './helpers';

import {
    isAppRunning,
    showStartSystemInfo
} from './helpers/startup';

Logger.setLevel( env.isProduction );
const initLog = new Logger('[rsis:index]:');

// const axios = require('axios').default;

// const log = require('loglevel');
// const { PORT, NODE_ENV } = process.env;

// const isProduction = NODE_ENV === 'production';
// log.setLevel( isProduction ? log.levels.DEBUG : log.levels.TRACE );

// const os = require('os');
// const util = require('util');
// const colors = require('colors');

// const {
//     icwd,
//     getProcessEnvWithout,
//     consoleLogger,
// } = require('./helpers/');

// const initLog = consoleLogger('[rsis:index]');

initLog.warn('Start of prepare section.');

(async () => {
    if( await isAppRunning( env.PORT, initLog )) {
        initLog.warn('App has already been launched.');
        process.exit( 1 );
    }
    await showStartSystemInfo( version );
    const { startServer } = await import ('./rsis-base');
    startServer();

    initLog.info('=======================');
    initLog.info('End of prepare section.');
    initLog.info('=======================');
})();
