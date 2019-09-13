const db = require('../databases').getDB('config');
//var Catalog = db.model('Catalog');
const IdList = db.model('IdMappingExcel');

const sendJSONresponse = function (res, status, content) {
  //console.log(`catalogs for excel:`, content);  
  res.status(status);
  res.json(content);
};

let testArr = [[2019011001, 2056], [2019011002, 2046]];


/**
 * 
 */

module.exports.catalogReadOne = function (req, res) {

  if (req.query && Object.keys(req.query).length != 0) {

    var query = req.query;
    query.client = 'excel'; //req.params.client;
    IdList
    .findOne(query, function(err, list) {
      if (!list) {
        sendJSONresponse(res, 404, {
          'message': 'list not found. Wrong query.'
        });
        return;
      } else if (err) {
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      console.log(`List's length = ${list.items.length} [0]: ${list.items[0]}`);
      sendJSONresponse(res, 200, list.items);    
    });

  } else {
      sendJSONresponse(res, 200, testArr );
  }
};


/**
 * 
 */

module.exports.catalogCreateOne = function (req, res) {

  if (req.query && Object.keys(req.query).length != 0) {

    var query = req.query;
    query.client = 'excel'; //req.params.client;
    query.items = req.body;
    IdList
    .create( query, function(err, list) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {        
        sendJSONresponse(res, 201, list);
      }
    });

  }
};


/**
 * 
 */

module.exports.catalogUpdateOne = function (req, res) {

  if (!req.query || Object.keys(req.query).length == 0) {
    sendJSONresponse(res, 404, {
      'message': 'Not found, non-empty Query is required.'
    });
    return;
  }
  var query = req.query;
  query.client = 'excel'; //req.params.client;

  IdList
  .findOne(query, function(err, list) {
    if (!list) {
      sendJSONresponse(res, 404, {
        'message': 'list not found. Wrong query.'
      });
      return;
    } else if (err) {
      console.log(err);
      sendJSONresponse(res, 404, err);
      return;
    }
    
    list.items = req.body;
    list.save(function(err, lst) {
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        sendJSONresponse(res, 200, lst);
      }
    });
  });  
};

/**
 * 
 */

module.exports.catalogDeleteOne = function (req, res) {
  sendJSONresponse(res, 405, {
    'message': 'Delete the lists restricted.'
  });
};
