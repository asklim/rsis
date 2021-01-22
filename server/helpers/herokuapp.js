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
 **     с интервалом между попытками INTERVAL_BETWEEN_ATTEMPTS.
 **     Если попытки не удались, то через reconnectInterval - повтор попыток
 **
 **  3. API возвращает объект: { message: 'app' }
 **
 **==========================================================================
***/

/** */
const debug = require( 'debug' )('_helper:herokuapp');

const log = require( './logger' );
//require( 'loggis' );
/*log.configure({
    loglevel: 'info',
    colorize: true,
    timestamp: true,
});*/
const request = require( 'request' );


const TOTAL_ATTEMPTS = 5;
const INTERVAL_BETWEEN_ATTEMPTS = 5000; 

var herokuTimer;
var allTimeAppTimer;
var reconnectInterval;

const { /*NODE_ENV,*/ API_SERVER } = process.env;

class NetworkError extends Error {}


/**
 * @description Функция ПОПЫТОК подключения к rsis-webapp/api
 * @param {Object} options - передается в tryConnectXtimes
 * @returns {undefined} - undefined 
**/

const reconnect = (options) => {

    let reqOptions = {
        url:     `${API_SERVER}/api/config/ping/app`,
        method:  "GET",
        headers: {
            credentials: "omit",
            "Content-Type": 'application/json',
            "Cache-Control": 'no-cache, no-store',
            charset: "utf-8"
        },
        json: {}, qs: {}
    };

    tryConnectXtimes( options, reqOptions )
    .then( resBody => {
        //let nowTime = new Date().toTimeString();
        //nowTime = nowTime.slice( 0, nowTime.indexOf(' ('));  //Cut ' (<name_of_timezone>)'
        if( herokuTimer ) {
            // Если к этому моменту herokuTimer == null, Ничего не выводим
            //let nowTime = (new Date()).toISOString();
            //console.log( `ping Heroku app is Ok at ${nowTime}: `, resBody ); 
            log.info( `ping Heroku app is Ok: `, resBody ); 
        }
    })
    .catch( exception => {

        if( exception instanceof NetworkError ) {
            //console.log( `Network Error: ${exception.message}` );
            log.info( `Network Error: ${exception.message}` );
        } 
        else {
            throw exception;
        }
    });
};


/**
 * @description Пробует получить ответ от API_SERVER X раз
 * @param {Number} options.totalAttempts - число попыток
 * @param {Number} options.interval - число миллисекунд между попытками
 * @param {Object} reqOptions - Параметры для http-запроса
 * 
 * @returns {Promise} - [object Error] OR [object Response Body]
**/

function tryConnectXtimes (options, reqOptions) {

    return new Promise( (resolve, reject) => {

        let done = false;

        function attempt (n) {

            if( n != 1 ) {
                log.info(`Connect attempt #${n} to ${reqOptions.url}`);
            }
            /*if( n == 1 ) {
                console.log(`Connect attempt #${n} to ${reqOptions.url}`);
            }
            else {
                let nowTime = (new Date()).toISOString();
                console.log(`Connect attempt #${n} at ${nowTime}`);
            }*/
            
            request( reqOptions, 
                (err, response, resBody) => {
                
                    done = true;
                    if( err ) { 
                        reject( err );
                    } 
                    else {
                        resolve( resBody );
                    }
                }
            );
            
            setTimeout( () => {
                
                if( done ) return;
                if( n < options.totalAttempts ) {
                    attempt( n+1 );
                } 
                else { 
                    reject( new NetworkError( 'Ответ сети был не ok.' ));
                }
            }, options.interval );
        }

        attempt( 1 );
    });
}


/**
 * @description Создает herokuTimer, если не существует.
 * 
**/

const startReconnection = () => {

    debug('startReconnection called.');
    
    if( !herokuTimer ) {

        let options = {
            totalAttempts: TOTAL_ATTEMPTS,
            interval: INTERVAL_BETWEEN_ATTEMPTS,
        };
        herokuTimer = setInterval( reconnect, reconnectInterval, options);
        //let nowTime = (new Date()).toISOString();
        //console.log( `No-Sleep Heroku-App is started at ${nowTime}.` );
        log.info( `No-Sleep Heroku-App is started.` );
        reconnect( options );
    }  
};



const stopReconnection = () => {

    /**
     * @description Останавливает и удаляет herokuTimer
     *  
    **/
    debug( 'stopReconnection called.' );
    
    if( herokuTimer ) {

        clearInterval( herokuTimer );
        herokuTimer = null;
        //let nowTime = (new Date()).toISOString();
        //console.log( `No-Sleep Heroku-App is stopped at ${nowTime}.` );
        log.info( `No-Sleep Heroku-App is stopped.` );
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

    reconnectInterval = 60000*reconnectMinutes;
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
