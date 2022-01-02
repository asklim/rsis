/****************************************************************************
 **
 **  1. На все время работы приложения запускается таймер allTimeAppTimer
 **     с интервалом reconnectInterval. Функция startStopReconnect проверяет
 **     если время в рабочем диапазоне 04..21UTC (07..24 BY), то создается
 **     или сохраняется таймер herokuTimer с интервалом reconnectInterval,
 **     иначе таймер удаляется и сервис засыпает до 04UTC
 **
 **  2. Функция reconnect, пока существует Таймер herokuTimer, пытается с
 **     интервалом reconnectInterval подключиться к rsis-webapp.herokuapp.com
 **     На каждом цикле используется до TOTAL_ATTEMPTS попыток включительно,
 **     с интервалом между попытками MILLISECONDS_BETWEEN_ATTEMPTS.
 **     Если попытки не удались, то через reconnectInterval - повтор попыток
 **
 **  3. API возвращает объект: { message: 'app', attempt: 1..5 }
 **
 **==========================================================================
***/


const debug = require( 'debug' )('heroku:');

const log = require( '../helpers' ).consoleLogger( 'Heroku:[no-sleep]:' );

const tryGetResource = require( './try-get-resource-x-times.js' );

const TOTAL_ATTEMPTS = 5;
const MILLISECONDS_BETWEEN_ATTEMPTS = 10*1000;


let herokuTimer;
let allTimeAppTimer;
let reconnectInterval;

const apiHerokuHealthUrl = `${process.env.API_SERVER}/api/config/ping/app`;


const herokuGetter = async (apiUrl) => await tryGetResource({
    attempts: TOTAL_ATTEMPTS,
    interval: MILLISECONDS_BETWEEN_ATTEMPTS,
    apiUrl,
});


const reconnect = async () => {
    try {
        const res = await herokuGetter( apiHerokuHealthUrl );

        // Если к этому моменту herokuTimer == null/undefined,
        // Ничего не выводим
        if( herokuTimer ) {
            log.info( `app health is Ok:`, {
                ...res?.response?.data, //axios format of response
                attempt: res?.attempt,
                ms: res?.ms,
            });
        }
    }
    catch (error) {
        log.error( error );
    }
};


/**
 * @description Создает herokuTimer, если не существует.
 *
**/
const startReconnection = () => {

    debug( 'startReconnection called.' );

    if( !herokuTimer ) {

        herokuTimer = setInterval( reconnect, reconnectInterval );
        log.info( `No-Sleep-Heroku-App started.` );
        reconnect();
    }
};


/**
 * @description Останавливает и удаляет herokuTimer
 *
**/
const stopReconnection = () => {

    debug( 'stopReconnection called.' );

    if( herokuTimer ) {

        clearInterval( herokuTimer );
        herokuTimer = null;
        log.info( `No-Sleep-Heroku-App stopped.` );
    }
};


/**
 * @description Функция вызывается каждые reconnectMinutes
 * на протяжении всего времени работы приложения.
**/
const startStopReconnect = () => {

    debug( 'startStopReconnect.' );

    const isNowInWorkTime = () => {

        let hours = (new Date()).getUTCHours();
        return ( hours > 4 && hours < 21 );
    };

    return ( isNowInWorkTime()
        ? startReconnection()
        : stopReconnection()
    );
};



function startReconnectionService( reconnectMinutes = 30 ) {

    debug( 'startReconnection Service.' );

    reconnectInterval = 60_000 * reconnectMinutes;
    allTimeAppTimer = setInterval( startStopReconnect, reconnectInterval );
    startReconnection();
}



function stopReconnectionService() {

    debug( 'stopReconnection Service.' );

    stopReconnection();
    clearInterval( allTimeAppTimer );
}



module.exports = {
    startReconnectionService,
    stopReconnectionService
};

