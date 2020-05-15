const request = require( 'request' );
const debug = require( 'debug' )('_helper:herokuapp');

var herokuTimer;
var allTimeAppTimer;
var reconnectInterval;

const { /*NODE_ENV,*/ API_SERVER } = process.env;

class NetworkError extends Error {}

const reconnect = () => {

    let options = {
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

    tryConnectXtimes( 5, options )
    .then( resBody => {
        //let nowTime = new Date().toTimeString();
        //nowTime = nowTime.slice( 0, nowTime.indexOf(' ('));  //Cut ' (<name_of_timezone>)'
        let nowTime = (new Date()).toISOString();
        console.log( `ping Heroku app is Ok at ${nowTime}: `, resBody ); 
    })
    .catch( exception => {

        if( exception instanceof NetworkError ) {
            console.log( `Network Error: ${exception.message}` );
        } 
        else {
            throw exception;
        }
    });
};



function tryConnectXtimes(totalAttemps, options) {

 return new Promise( (resolve, reject) => {

    const ATTEMPT_INTERVAL = 5000;
    let done = false;

        function attempt(n) {

            if( n > 1 ) console.log(`Connect attempt #${n} to ${options.url}`);
            
            request( options, 
            (err, response, resBody) => {
            
                done = true;
                if( err ) { 
                    reject( err );
                } 
                else {
                    resolve( resBody );
                }
            });
            
            setTimeout( () => {
                
                if( done ) return;
                if( n < totalAttemps ) {
                    attempt( n+1 );
                } 
                else { 
                    reject( new NetworkError( 'Ответ сети был не ok.' ));
                }
            }, ATTEMPT_INTERVAL );
        }

    attempt( 1 );
  });
}



const startReconnection = () => {

    debug('startReconnection called.');
    
    if( !herokuTimer ) {

        herokuTimer = setInterval( reconnect, reconnectInterval );
        console.log( 'No-Sleep Heroku-App is started.' );
        reconnect();
    }  
};



const stopReconnection = () => {

    debug( 'stopReconnection called.' );
    
    if( herokuTimer ) {

        clearInterval( herokuTimer );
        herokuTimer = null;
        console.log( 'No-Sleep Heroku-App is stopped.' );
    }
};
 


const isNowInWorkTime = () => {

    let hours = (new Date()).getUTCHours();
    return ( hours > 4 && hours < 21 );
};



const startStopReconnect = () => {

    debug( 'startStopReconnect.' );

 return ( isNowInWorkTime() 
        ? startReconnection()
        : stopReconnection() 
    );
};



function startReconnectionService( reconnectMinutes ) {  

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
