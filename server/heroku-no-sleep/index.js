const debug = require('debug')('_rsis:heroku-no-sleep');
const dbgTmp = require('debug')('_temp:rsis:heroku-no-sleep');
const log = require('../helpers').consoleLogger('[heroku-no-sleep]');

const {
    reconnect,
    isNowInWorkTime,
} = require('./reconnect.js');

const HEROKU_PING_EVENT = 'herokuping';

/**
**  1. На все время работы приложения запускается таймер allTimeAppTimer
**     с интервалом reconnectInterval. Функция startStopReconnect проверяет
**     если время в рабочем диапазоне 04..21UTC (07..24 BY), то создается
**     или сохраняется таймер herokuTimer с интервалом reconnectInterval,
**     иначе таймер удаляется и сервис засыпает до 04UTC
*/
module.exports = function createPinger (
    server,
    minutes
) {
    const msInterval = 60_000 * minutes;
    const started = server.getStartTime?.() ?? 0;
    dbgTmp(`started timestamp: ${started}`);

    log.debug(`Reconnection Service started, reconnect every ${minutes} minutes.`);

    let isPingerRunning = true;
    let herokuTimer;

    server.on( HEROKU_PING_EVENT, herokuPingEvent_handler );

    server.on( 'close', () => {
        clearTimeout( herokuTimer );
        log.debug('Reconnection Service stopped.');
    });

    emitHerokuPing();


    function herokuPingEvent_handler () {
        if( isNowInWorkTime() ) {
            debug('pinger: ping event in worktime!'); // (2nd)second
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
        debug('pinger: timer setted !'); // (3rd)third
    }

    function emitHerokuPing () {
        debug('ping: event emiting ....'); // (1st)first
        server.emit( HEROKU_PING_EVENT );
        debug('ping: event emitted !');  // (4th)forth
        debug(`App running from ${(new Date( started )).toISOString()}`);
    }
};

