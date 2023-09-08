import {
    debugFactory,
    Logger,
} from '../helpers/';

const d = debugFactory('--rsis:heroku-no-sleep');
const log = new Logger('[heroku-no-sleep]');

import type { RsisExpress } from '../types';

import reconnect from './reconnect';

const HEROKU_PING_EVENT = 'herokuping';

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
    const msInterval = 60_000 * minutes;
    const started = server.getStartTime?.() ?? 0;
    d(`started timestamp: ${started}`);

    log.debug(`Reconnection Service started, reconnect every ${minutes} minutes.`);

    let isPingerRunning = true;
    let herokuTimer;

    server.on( HEROKU_PING_EVENT, herokuPingEvent_handler );

    server.on('close', () => {
        clearTimeout( herokuTimer );
        log.debug('Reconnection Service stopped.');
    });

    emitHerokuPing();


    function herokuPingEvent_handler () {

        const isNowInWorkTime = () => {
            let hours = (new Date()).getUTCHours();
            return ( hours > 4 && hours < 21 );
        };

        if( isNowInWorkTime() ) {
            d('pinger: ping event in worktime!'); // (2nd)second
            if( !isPingerRunning ) {
                isPingerRunning = true;
                log.info(`App running from ${(new Date( started )).toUTCString()}`);
                log.info(`No-Sleep-Heroku-App started.`);
            }
            reconnect();
        }
        else {
            if( isPingerRunning ) {
                isPingerRunning = false;
                log.info(`No-Sleep-Heroku-App stopped.`);
                log.info(`App running from ${new Date( started )}`);
            }
        }
        herokuTimer = setTimeout( emitHerokuPing, msInterval );
        d('pinger: timer setted !'); // (3rd)third
    }


    function emitHerokuPing () {
        d('ping: event emiting ....'); // (1st)first
        server.emit( HEROKU_PING_EVENT );
        d('ping: event emitted !');  // (4th)forth
        d(`App running from ${(new Date( started )).toISOString()}`);
    }
};
