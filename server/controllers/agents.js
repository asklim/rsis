const db = require('../databases').getDB('config');
const Agent = db.model('Agent');

const sendJSONresponse = (res, status, content) =>
{
  //console.log('sendJSON: ', content);
  //console.log('sendJSON: ', Object.keys(content[0]));
  logAgents(content);
  res.status(status);
  res.json(content);
};

/**
 * 
 * @param {*} content - может быть
 *        one object - если возврат одного элемента
 *  array of objects - если возврат всех элементов
 *   array of string - если возврат списка types, groups or ids
 *  
 */
function logAgents(content) 
{


  //console.log('typeof content: ', typeof content); // object
  //console.log('content isArray: ', Array.isArray(content));
  if (Array.isArray(content)) 
  {
    if (!content.length)    
    {
      console.log(`agent [empty]:`);
      console.log( content );
      return;   
    }

    //console.log('typeof content[0]: ', typeof content[0] );
    // object or string

    if (typeof content[0] === 'string')
    {
      console.log(`agents [string, ...]:`);
      console.log( content );
      return;
    }

    //console.log('logAgents: ', Object.keys(content[0]));
    // [ '$__', 'isNew', 'errors', '_doc', '$init' ]

    //console.log('logAgents: ');
    //console.dir( content[0], {colors: true});
    const shortAgents = content.map( 
      (agent) => 
      {
        let { id, type, group, caption } = agent._doc;            
        /*let {id} = agent._doc;
        let {type} = agent._doc;
        let {group} = agent._doc;
        let {caption} = agent._doc;*/
        let res = {id};
        if (type) res = {...res, type};
        if (group) res = {...res, group};
        if (caption) res = {...res, caption};
        return res;
      }
    );        
    console.log(`agents [{}, ... ]:`);
    console.log(shortAgents);

  }
  else {
    console.log(`agent one {object}:`);
    console.log( content );
  }
}


/** 
 * Read a agent info by the id 
 * GET /api/config/agents/:agentId 
 **/
module.exports.readOne = (req, res) =>
{
  console.log('ROne: Finding agent`s params: ', req.params);
  console.log('ROne: Finding agent`s query: ', req.query);
  console.log(req.hostname);
  
  const { agentId } = req.params;
  if (req.params && agentId) 
  {
    Agent.findOne( 
      {id: agentId},
      (err, agent) =>
      {
        if (!agent) {
          sendJSONresponse(res, 404, {
            'message': 'agent.Id not found'
          });
          return;
        } else if (err) {
          //console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }        
        sendJSONresponse(res, 200, agent);
      });
  } 
  else {
    console.log('No agent.Id specified');
    sendJSONresponse(res, 404, {
      'message': 'No agent.Id in request'
    });
  }
};


/** 
 * Create a new agent 
 * POST /api/config/agents 
 */
module.exports.create = (req, res)  =>
{
  //console.log(req.body);
  Agent.create( 
    req.body, 
    (err, agent) => 
    {
      if (err) {
        //console.log(err);
        sendJSONresponse(res, 400, err);
      } 
      else {
        sendJSONresponse(res, 201, agent);
      }
  });
};


/** 
 * Update agent
 * PUT /api/config/agents/:agentId 
 */
module.exports.updateOne = (req, res) =>
{
  //console.log(req.body);
  const { agentId } = req.params;
  if (!agentId) 
  {
    sendJSONresponse(res, 404, {
      'message': 'Not found, agent.id is required'
    });
    return;
  }

  Agent.findOne(
    {id: agentId},
    (err, agent) =>
    {
      if (!agent) {
        sendJSONresponse(res, 404, {
          'message': 'agent.id not found'
        });
        return;
      } 
      else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }

      Object.assign(agent, req.body);
      //agent.host = req.body.host;

      agent.save( (err, agent) =>
      {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, agent);
        }
      });
  });
};      


/** 
 *DELETE /api/config/agents/:agentId 
 */
module.exports.deleteOne = (req, res) =>
{
  //console.log('dOne: Finding agent`s params: ', req.params);
  //console.log('dOne: Finding agent`s query: ', req.query);
  const { agentId } = req.params;

  if (!agentId || agentId==='') 
  {
    sendJSONresponse(res, 404, {
      'message': 'No agent.id'
    });    
  } 
  else {
    Agent.findOneAndDelete(
      {id: agentId},
      (err) =>
      { 
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log('Agent id ' + agentId + ' deleted');
        sendJSONresponse(res, 204, null);
    });
  }
};


/** 
 * Read a list of all agents
 * GET /api/config/agents 
 */
module.exports.readListAll = (req, res) =>
{
  console.log('LAll: Finding agent`s params: ', req.params);
  console.log('LAll: Finding agent`s query: ', req.query);
  if (req.params) 
  { //={}
    let propName;
    let projection;
    const projections = {
       'types': {_id: 0, type: 1},
      'groups': {_id: 0, group: 1},
        'ids' : {_id: 0, id: 1},
       'list' : {_id: 0, id: 1, caption: 1}
    };    
    let queryLength = Object.keys(req.query).length;
    let conditions = {}; // all agents

    if (req.query && queryLength) // !==0
    {
      propName = Object.keys(req.query)[0];
      if(!(propName in projections)) 
      {
        sendJSONresponse(res, 404, {
          'message': 'No valid params in request'
        });
        return;
      }

      projection = projections[propName] || '';
      if (queryLength > 1)
      {
        //let {type, group} = req.query;
        let type = new RegExp(req.query.type,'i');
        let group = new RegExp(req.query.group,'i');
        if (req.query.type) { 
          conditions = {...conditions, type};
        }
        if (req.query.group) {
          conditions = {...conditions, group};
        } 
      }
    }
    else {
      projection = '';
    }    
    console.log('conditions: ', conditions);
    console.log('projection: ', projection);

    Agent.find(
      conditions, 
      projection,
      (err, agents) =>
      {
        if (!agents) {
          sendJSONresponse(res, 404, {
            'message': 'agents not found'
          });
          return;
        } 
       
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }       
        
        //console.log('readAll: ', Object.keys(agents));
        //console.log('agents Before: ', agents[0]);
        //console.log('propName: ', propName);
        if (propName) // && propName !=='') 
        {          
          let docs;
          switch (propName.toLowerCase()) 
          {
            case 'types':
              docs = uniqueValue( agents, 'type');
              break;
            case 'groups':
              docs = uniqueValue( agents, 'group');
              break;
            case 'ids':
              docs = uniqueValue( agents, 'id');              
              break;
            default:
              docs = [...agents];
              
          }
          //console.log('readAll: ', Object.keys(docs[0]));
          //console.log('docs[0]: ', docs[0]);
          //console.dir(docs);
          sendJSONresponse(res, 200, docs);
          return;
        }
        else {  
          sendJSONresponse(res, 200, agents);
          return;
        }
    });   
  } 
  else {
    console.log('No params for all-list specified');
    sendJSONresponse(res, 404, {
      'message': 'No all-list params in request'
    });
  }
};


function uniqueValue( arr, propName ) 
{
  let arrSet = new Set();
  arr.forEach( elem => {arrSet.add(elem[propName]);});
  var result = [];
  arrSet.forEach( elem => {result.push(elem);});
  return result;
}
