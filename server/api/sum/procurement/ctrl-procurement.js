const debug = require('debug')('api:sum:procurement');
const request = require( 'request' );
const icwd = require( 'fs' ).realpathSync( process.cwd() );

const HTTP = require(`${icwd}/src/config/httpResponseCodes`);
const dataset = require( `${icwd}/server/sample-datasets/procurement` );
const { procurementPeriods: period } = require( `${icwd}/src/config/enumValues` );
const { needUnitsForPeriod } = require( `${icwd}/src/lib/rsis` );

const { NODE_ENV, API_SERVER } = process.env;
const { API_SERVER_LOCAL } = require( `${icwd}/server/helpers/serverconfig` );

const apiServer = NODE_ENV === 'production' 
  ? API_SERVER                   //'https://rsis-webapp.herokuapp.com'
  : API_SERVER_LOCAL;


const sendJSONresponse 
= (res, status, content) => {
  res.status( status );
  res.json( content );
};

const summa = (accum, current) => accum + current;

const onlyItemsXtraLongGTZero = item => item.xlp.reduce( summa ) > 0;

const convertToProcurement = item => 
{
  item.sp = needUnitsForPeriod( item, period.short );
  item.mp = needUnitsForPeriod( item, period.middle );
  item.lp = needUnitsForPeriod( item, period.long );
  item.xlp = needUnitsForPeriod( item, period.xtraLong );            
  delete item.valid;
  delete item.fqA;
  delete item.fqM;
  return item;
};

const makeProcurementDataSet = (hostname, weekId, callback) => 
{
  if( !hostname || hostname == '' ) {
    // Тестовый датасет если hostname=''
    callback( null, dataset );
    return;
  }
    
  let reqOptions = {
    url: `${hostname}/api/sum/weeknatural/${weekId}`,
    method: "GET",
    headers: {
      "Cache-Control": "no-cache, no-store"
    },
    json: {}, qs: {},
  };    
  request( 
    reqOptions,
    (err, res, resBody) =>  // '{id, type, ..., body:[{}, ..., {}]}' 
    {  
      //console.log(chalk.green('ctrl-procurement: week-natural data got.'));
      if( err ) {
        callback( err, null );
        return;   
      }
      if( !resBody ) {
        callback( null, null );
        return;   
      }
      debug( 'ctrl-: week-natural data got: %d items', resBody.body.length );
      debug( 'ctrl-: convert week-natural-body to procurement dataset.' );

    //Преобразование в Procurement DataSet        
      callback( null, 
        resBody.body
        .map( convertToProcurement )
        .filter( onlyItemsXtraLongGTZero ) 
        // Клиент получает только те позиции которые нужны на закупку
        // на xtraLong период
        // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]   
      );
  });
};

/** 
 * Read a procurement dataset by the week id 
 * GET /api/sum/procurements/:weekId 
 **/
const readOne = (req, res) =>
{
  if( !req.params ) { 
    sendJSONresponse( res, 
      HTTP.BAD_REQUEST,
      { message: 'No .params in request.' }
    );
    return;
  }

  console.log(
    'readOne: Finding procurement\'s params: ', req.params, '\n',
    'readOne: Finding procurement\'s query: ', req.query
  );
  debug(`hostname is ${req.hostname}`);
  
  const { weekId } = req.params;  
  if( !weekId ) { 
    console.log( '\tProcurement`s readOne: No week.Id specified.' );
    sendJSONresponse( res, 
      HTTP.BAD_REQUEST, 
      { message: 'No week.Id in request.' }
    );
    return;
  }

  debug('readOne: before fetch Dataset ...');
  makeProcurementDataSet( apiServer, weekId,
    (err, data) =>
    {
      if( err ) {
        //console.log(err);
        sendJSONresponse( res, HTTP.BAD_REQUEST, err );
        return;
      } 
      if( !data ) {
        sendJSONresponse( res, 
          HTTP.NOT_FOUND, 
          { message: `data for week ${weekId} not found.` }
        );
        return;
      }       
      sendJSONresponse( res, HTTP.OK, data );
  });
};


module.exports = {
  readOne,
  //create,
  //updateOne,
  //deleteOne,
};