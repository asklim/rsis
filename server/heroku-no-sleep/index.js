const debug = require( 'debug' )('_rsis:heroku-no-sleep');
const log = require( '../helpers' ).consoleLogger( '[heroku-no-sleep]' );

const {
    reconnect,
    isNowInWorkTime,
} = require( './reconnect.js' );

const HEROKU_PING_EVENT = 'herokuping';

/**
**  1. На все время работы приложения запускается таймер allTimeAppTimer
**     с интервалом reconnectInterval. Функция startStopReconnect проверяет
**     если время в рабочем диапазоне 04..21UTC (07..24 BY), то создается
**     или сохраняется таймер herokuTimer с интервалом reconnectInterval,
**     иначе таймер удаляется и сервис засыпает до 04UTC
*/
module.exports = function createPinger (server, minutes) {

    function onePing () {
        debug( 'ping: event emiting ....' ); // first
        server.emit( HEROKU_PING_EVENT );
        debug( 'ping: event emitted !' );  // forth
    }

    log.debug(
        `Reconnection Service started, reconnect every ${minutes} minutes.`
    );
    let isRunning = true;

    let herokuTimer;
    const msInterval = 60_000 * minutes;

    server.on( HEROKU_PING_EVENT, () => {
        if( isNowInWorkTime() ) {
            debug( 'pinger: ping event in worktime!' ); // second
            if( !isRunning ) {
                isRunning = true;
                log.info( `No-Sleep-Heroku-App started.` );
            }
            reconnect();
        }
        else {
            if( isRunning ) {
                isRunning = false;
                log.info( `No-Sleep-Heroku-App stopped.` );
            }
        }
        herokuTimer = setTimeout( onePing, msInterval );
        debug( 'pinger: timer setted !' ); // third
    });

    server.on( 'close', () => {
        //debug( 'pinger: timer removing ...', herokuTimer );
        clearTimeout( herokuTimer );
        log.debug( 'Reconnection Service stopped.' );
        //debug( 'pinger: timer removed !!!', herokuTimer );
    });

    onePing();
};

