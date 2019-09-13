
//const chalk = require('react-dev-utils/chalk');

const icwd = require('fs').realpathSync(process.cwd());
const db = require(`${icwd}/server/databases`).getDB('sum');
const WeekNatural = db.model('WeekNatural');

//const workdate = require(`${icwd}/imports/utils/workdate`);

const sendJSONresponse = (res, status, content) =>
{
  //console.log('sendJSON: ', content);
  //console.log('sendJSON: ', Object.keys(content[0]));
  //logAgents(content);
  res.status(status);
  res.json(content);
};

/** 
 * Read a week summary Natural info by the XXI century weekId or 'last' 
 * GET /api/sum/weeknatural/:weekId
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/last 
 *
 * */
const readOne = (req, res) =>
{
  console.log(
    'readOne: Finding weekNatural\'s params: ', req.params, '\n',
    'readOne: Finding weekNatural\'s query: ', req.query
  );
  //console.log(req.hostname);
  
  const { weekId } = req.params;
  if (req.params && weekId) 
  {
    const finding = weekId === 'last' ? {} : { id: weekId };
    const sorting = weekId === 'last' ? {id: -1} : {};
    WeekNatural.find( finding )
    .sort( sorting )
    .limit(1)
    .exec((err, docs) =>
      {
        if (!docs || docs.length < 1) {
          sendJSONresponse(res, 404, {
            message : `Summary data for week ${weekId} not found.`
          });
          return;
        }
        if (err) { //console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }        
        sendJSONresponse(res, 200, docs[0]);
      });
  } 
  else {
    console.log('\tWeekNatural readOne: No week.Id specified.');
    sendJSONresponse(res, 400, {
      message : 'No week.Id in request.'
    });
  }
};


/** 
 * Create a new week Natural
 * POST /api/sum/weeknatural
 *  
 **/
const create = (req, res)  =>
{
  //console.log("sum-week-natural create: ", req.body); 
  if (!req.body || req.body === {}) {
    sendJSONresponse(res, 400, {
      message : 'Bad request, body is required'
    });
    return;
  }
  const { id : weekId } = req.body;
  if (!weekId ||  weekId === '') {
    sendJSONresponse(res, 400, {
      message : 'Bad request, week number is required'
    });
    return;
  }  
  
  const finding = { id : weekId };

  WeekNatural.find( finding )
    .limit(1)
    .exec((err, docs) => { 
      if(err) { //console.log(err);
        sendJSONresponse(res, 503, err);
        return;
      }
      if(docs && docs.length !== 0) {
        sendJSONresponse(res, 409, {
          message : `Summary data for week ${weekId} already exists.`});
        return;
      }
      WeekNatural.create( 
        req.body, 
        // eslint-disable-next-line no-unused-vars
        (err, sumDoc) => 
        {
          if (err) {
            console.log('ctrl-weeknatural err: ', err);
            sendJSONresponse(res, 503, err);
          } 
          else {
            sendJSONresponse(res, 201, {
              message : `Summary data for week ${weekId} created successfull.`});
          }
      });
    }
  );    
};


/** 
 * Update week Natural summary
 * PUT /api/sum/weeknatural/:weekId
 *  
 **/
const updateOne = (req, res) =>
{
  //console.log(req.body);
  const { id : weekId } = req.body;
  if (!weekId) {
    sendJSONresponse(res, 400, {
      message : 'Bad request, weekId is required'
    });
    return;
  }
  if (!req.body || req.body === {}) {
    sendJSONresponse(res, 400, {
      message : 'Bad request, body is required'
    });
    return;
  }

  const finding = weekId === 'last' ? {} : { id: weekId };
  const sorting = weekId === 'last' ? {id: -1} : {};

  WeekNatural.find( finding )
    .sort( sorting )
    .limit(1)
    .exec((err, docs) =>
    {
      if (!docs || docs.length < 1) {
        sendJSONresponse(res, 404, {
          message : `Summary data for week ${weekId} not found.`
        });
        return;
      }
      if (err) { //console.log(err);
        sendJSONresponse(res, 503, err);
        return;
      }

      Object.assign(docs[0], 
        req.body,
        { updatedAt : Date.now() }
      );
      //doc[0].host = req.body.host;

      docs[0].save( (err, result) =>
      {
        if (err) {
          sendJSONresponse(res, 503, err);
        } else {
          sendJSONresponse(res, 200, result);
        }
      });
  });
};   


/** 
 *DELETE /api/sum/weeknatural/:weekId 
 */
const deleteOne = (req, res) =>
{
  const { weekId } = req.params;

  if (!weekId || weekId === '') {
    sendJSONresponse(res, 400, {
      message : 'Bad request, weekId is required.'
    });    
    return;
  }   
  WeekNatural.findOneAndDelete(
    {id: weekId},
    (err) => { 
      if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log('Week ' + weekId + ' natural summary deleted.');
      sendJSONresponse(res, 204, null);
  });  
};

module.exports = {
  readOne,
  create,
  updateOne,
  deleteOne,
};
