
import type { RsisExpress } from '../types';

import {
    env,
    debugFactory,
    packageVersion,
    Logger,
} from '../helpers/';
import { showServerAppInfo } from '<ssrv>/helpers/startup/';

const d = debugFactory('--rsis:heartbeat');
const log = new Logger('[rsis:heartbeat]');

import reconnect from './reconnect';

const HEARTBEAT_PING_EVENT = 'heartbeatping';

type HeartbeatTaskFn = {
    (): void;
    (server: RsisExpress): void;
};
const tasks: HeartbeatTaskFn[] = [];

/**
 * Поддержка HerokuApp в рабочем состоянии, т.к. контейнеры Heroku засыпают
 * через 30 минут неактивности
 * * На все время работы приложения запускается таймер allTimeAppTimer
 * с интервалом reconnectInterval.
 * * Функция startStopReconnect проверяет
 * если время в рабочем диапазоне 04:00..21:00UTC (07:00..24:00 BY), то создается
 * или сохраняется таймер herokuTimer с интервалом reconnectInterval,
 * иначе таймер удаляется и сервис засыпает до 04:00UTC
**/
export default function createPinger (
    rsisExpressApp: RsisExpress,
    minutes: number
) {
    let heartbeatTimer: NodeJS.Timeout;

    const msInterval = 60_000 * minutes;
    const started = rsisExpressApp.getStartTime?.() ?? 0;
    d(`started timestamp: ${started}`);

    function emitHeartbeatPing () {
        // d('ping: event emiting ....'); // (1st)first
        rsisExpressApp.emit( HEARTBEAT_PING_EVENT );
        // d('ping: event emitted !');  // (4th)forth
        d(`App heartbeat since ${(new Date( started )).toISOString()}`);
    }

    function heartbeatEventHandler () {
        for (const taskFn of tasks) {
            taskFn( rsisExpressApp );
        }
        heartbeatTimer = setTimeout( emitHeartbeatPing, msInterval );
    }

    rsisExpressApp.on( HEARTBEAT_PING_EVENT, heartbeatEventHandler );

    rsisExpressApp.addListener('close', () => {
        clearTimeout( heartbeatTimer );
        log.debug('Heartbeat Service stopped.');
    });

    makeAllTasks();
    emitHeartbeatPing();

    log.debug(`Heartbeat Service started, checkup every ${minutes} minutes.`);
};


function makeAllTasks () {

    tasks.push( everydayLogAppStartTime as HeartbeatTaskFn );

    if ( env.API_SERVER == '') {
        log.warn('Heroku Reconnection Task not started (No Heroku URL).');
    }
    else {
        tasks.push( herokuPingTask );
    }
}


const isNowInWorkTime = () => {
    let hours = (new Date()).getUTCHours();
    return ( hours > 4 && hours < 21 );
};


let isTodayLogAST = false;

function everydayLogAppStartTime (
    rsisExpressApp: RsisExpress
) {
    const started = rsisExpressApp.getStartTime?.() ?? 0;
    const server = rsisExpressApp.get('getHTTPServer')?.();

    if ( isNowInWorkTime() ) {
        if( !isTodayLogAST ) {
            isTodayLogAST = true;
            const utc = (new Date( started )).toUTCString();
            log.info(`App (v.${packageVersion}) started at ${utc}`);
            showServerAppInfo( server, log );
        }
    }
    else {
        if ( isTodayLogAST ) {
            isTodayLogAST = false;
            log.info(`App running since ${new Date( started )}`);
        }
    }
}


let isPingerRunning = true;

function herokuPingTask () {

    if ( isNowInWorkTime() ) {
        if( !isPingerRunning ) {
            isPingerRunning = true;
            log.info(`No-Sleep-Heroku-App task started.`);
        }
        reconnect();
    }
    else {
        if ( isPingerRunning ) {
            isPingerRunning = false;
            log.info(`No-Sleep-Heroku-App task stopped.`);
        }
    }
}
