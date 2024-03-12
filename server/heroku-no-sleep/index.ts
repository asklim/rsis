import {
    env,
    debugFactory,
    Logger,
} from '../helpers/';

const d = debugFactory('--rsis:heartbeat');
const log = new Logger('[rsis:heartbeat]');

import type { RsisExpress } from '../types';

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
    server: RsisExpress,
    minutes: number
) {
    let heartbeatTimer: NodeJS.Timeout;

    const msInterval = 60_000 * minutes;
    const started = server.getStartTime?.() ?? 0;
    d(`started timestamp: ${started}`);

    function emitHeartbeatPing () {
        // d('ping: event emiting ....'); // (1st)first
        server.emit( HEARTBEAT_PING_EVENT );
        // d('ping: event emitted !');  // (4th)forth
        d(`App running from ${(new Date( started )).toISOString()}`);
    }

    function heartbeatEventHandler () {
        for (const taskFn of tasks) {
            taskFn( server );
        }
        heartbeatTimer = setTimeout( emitHeartbeatPing, msInterval );
    }

    server.on( HEARTBEAT_PING_EVENT, heartbeatEventHandler );

    server.on('close', () => {
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
    server:RsisExpress
) {
    const started = server.getStartTime?.() ?? 0;

    if ( isNowInWorkTime() ) {
        if( !isTodayLogAST ) {
            isTodayLogAST = true;
            log.info(`App running from ${(new Date( started )).toUTCString()}`);
        }
    }
    else {
        if ( isTodayLogAST ) {
            isTodayLogAST = false;
            log.info(`App running from ${new Date( started )}`);
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
