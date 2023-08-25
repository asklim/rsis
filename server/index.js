#!/usr/bin/env node
require('dotenv').config();
const axios = require('axios').default;

const log = require('loglevel');
const { PORT, NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
log.setLevel( isProduction ? log.levels.DEBUG : log.levels.TRACE );

const os = require('os');
const util = require('util');
const colors = require('colors');

const {
    icwd,
    getProcessEnvWithout,
    consoleLogger,
} = require('./helpers/');

const initLog = consoleLogger('[rsis:index]');

initLog.warn('Start of init section.');

// (async () => {
// })();

const version = require(`${icwd}/package.json`).version;

(async () => {
    if( await isAppInProcess( PORT )) {
        initLog.warn('App has already been launched.');
        process.exit( 1 );
    }
    await outputStartServerInfo( version );
    require('./rsis-base.js');
    initLog.info('End of init section.');
})();


/******************************************************************/

async function outputStartServerInfo (
    // @ts-ignore
    appVersion
) {
    const {
        PWD, USER, NAME, NODE_ENV
    } = process.env;
    const node_env = NODE_ENV || 'undefined';
    const userInfo = util.format('%O', os.userInfo() );

    const envList = await getProcessEnvWithout('npm_, XDG, LESS');

    console.log('app version', appVersion.cyan );
    console.log('NODE Environment is', node_env.cyan );

    console.log( envList );

    console.log('stdout.isTTY is'.gray, `${process.stdout.isTTY}`.yellow );
    // isTTY == true - in terminal, undefined - in service journal
    console.log('package.json dir is'.gray, `${icwd}`.red ); // = '/app'
    console.log(`PWD (${__filename}) is ${PWD}`.red );
    console.log('USER @ NAME'.red, 'is'.gray, `${USER} @ ${NAME}`.red );
    console.log(
        'platform is'.gray, `${os.platform()}`.cyan,
        ', hostname is'.gray, `${os.hostname()}`.cyan );
    console.log( colors.gray('User Info :'), userInfo.yellow, '\n');
}


async function isAppInProcess (
    // @ts-ignore
    port
) {
    try {
        let path = `http://localhost:${port}/api/health/app`;
        let response = await axios.get( path );
        initLog.debug('isAppInProgress path:', path );
        initLog.debug('isAppInProgress is true, data:', response.data );
        return true;
    }
    catch {
        //initLog.debug('isAppInProgress is false', err );
        return false;
    }
}
