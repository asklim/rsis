const request = require( 'request' );
const debug = require( 'debug' )('_helper:herokuapp');
var herokuTimer;
var allTimeAppTimer;
var reconnectInterval;

const { /*NODE_ENV,*/ API_SERVER } = process.env;


const reconnect 
= () => {
  let options = {
    url: `${API_SERVER}/api/config/ping/app`,
    method: "GET",
    headers: {
      credentials: "omit",
      "Content-Type": "application/json",
      "Cache-Control": 'no-cache, no-store',
      charset: "utf-8"
    },
    json: {}, qs: {}
  };
  request( options, (err, response, resBody) => {
    if( err ) {
      console.log( `fetch data from ${options.url} is not ok.`, response );
      throw new Error( 'Ответ сети был не ok.' );   
    }
    let nowTime = new Date().toTimeString();
    nowTime = nowTime.slice( 0, nowTime.indexOf(' ('));  //Cut ' (<name_of_timezone>)'
    console.log( `ping Heroku app is Ok at ${nowTime}: `, resBody );     
    return resBody.body;          
  });
};


const startReconnection
= () => {
  debug('startReconnection called.');
  if( !herokuTimer ) {
    herokuTimer = setInterval( reconnect, reconnectInterval );
    console.log( 'No-Sleep Heroku-App is started.' );
    reconnect();
  }  
};

const stopReconnection 
= () => {
  debug('stopReconnection called.');
  if( herokuTimer ) {
    clearInterval( herokuTimer );
    herokuTimer = null;
    console.log( 'No-Sleep Heroku-App is stopped.' );
  }
};
 
const isNowInWorkTime 
= () => {
  let hours = new Date().getUTCHours();
  return ( hours > 4 && hours < 21 );
};

const startStopReconnect 
= () => {
  debug('startStopReconnect.');
  return ( isNowInWorkTime() ? startReconnection()
    : stopReconnection() 
  );
};

const startReconnectionService 
= (reconnectMinutes) => {  
  debug('startReconnection Service.');
  reconnectInterval = 60000*reconnectMinutes;
  allTimeAppTimer = setInterval( startStopReconnect, reconnectInterval );
  startReconnection();
};

const stopReconnectionService 
= () => {
  debug('stopReconnection Service.');
  stopReconnection();
  clearInterval( allTimeAppTimer );  
};


module.exports = {
  startReconnectionService,
  stopReconnectionService
};
