const icwd = require('fs').realpathSync(process.cwd());
let db = require(`${icwd}/server/databases`).getDB('config');
const Agent = db.model('Agent');
db = require(`${icwd}/server/databases`).getDB('sum');
const WeekNatural = db.model('WeekNatural');
const HTTP = require(`${icwd}/src/config/http-response-codes`);

var debug = require('debug')('api:config:ping');

const sendJSONresponse = (res, status, content) =>
{
  res.status(status);
  res.json(content);
};

const response400 = (res, msg = 'Bad Request (invalid syntax)') => {
  // Bad Request (invalid syntax)
  sendJSONresponse(res, HTTP.BAD_REQUEST, { message : msg});
};

/** 
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * return 200 {message : 'app'} - is Ok or nothing if app doesn't work  
 * 
 * GET /api/config/ping/mongocfg
 * GET /api/config/ping/mongosum
 * return 200 {message : 'nn'} - count of docs.   
 * return 404 {message : '-1'} - no Mongo
 **/

module.exports.readOne = (req, res) =>
{
  //params : {'app' | 'mongo'}
  let count = Object.keys(req.params).length;
  debug('ctrl.ROne: params: %O count: %d', req.params, count);
  //debug('ctrl.ROne: query: %O', req.query);  

  if( !count || count === 0) // должно быть
  {    
    response400( res, ".params is missing" );
    return;
  }

  const { pingId } = req.params;
  if( !pingId ) // req.params.* должен быть
  {    
    response400( res, ".pingId not present" );
    return;      
  }

  if(pingId.toLowerCase() === 'app') {    
    sendJSONresponse( res, HTTP.OK, {message : 'app'} );
    return;      
  }

  if(pingId.toLowerCase() === 'mongocfg') {
    Agent.countDocuments({}, (err,count) => {
      if(err) {
        sendJSONresponse( res, HTTP.SERVICE_UNAVAILABLE, {message : '-1'} );
        return;
      }            
      sendJSONresponse( res, HTTP.OK, {message : count.toString()} );
      return;      
    });
    return;
  }

  if(pingId.toLowerCase() === 'mongosum') {
    WeekNatural.countDocuments({}, (err,count) => {
      if(err) {
        sendJSONresponse( res, HTTP.SERVICE_UNAVAILABLE, {message : '-1'} );
        return;
      }            
      sendJSONresponse( res, HTTP.OK, {message : count.toString()} );
      return;      
    });
    return;
  }

  response400(res);
};
