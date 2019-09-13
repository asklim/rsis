"use strict";
//var mongoose = require('mongoose');
var db = require('../databases/databases').getDB('config');
var SPlace = db.model('SalePlace');

var sendJSONresponse = function(res, status, content) {
  console.log(`saleplaces: ${content}`);
  res.status(status);
  res.json(content);
};



/** 
  * GET a saleplace info by the id 
  *
  **/
module.exports.saleplaceReadOne = function(req, res) {
  console.log('Finding sale place details', req.params);
  if (req.params && req.params.placeId) {
    SPlace
      .findById(req.params.placeId)
      .exec(function(err, saleplace) {
        if (!saleplace) {
          sendJSONresponse(res, 404, {
            'message': 'saleplace.Id not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(saleplace);
        sendJSONresponse(res, 200, saleplace);
      });
  } else {
    console.log('No saleplace.Id specified');
    sendJSONresponse(res, 404, {
      'message': 'No saleplace.Id in request'
    });
  }
};

/* POST a new saleplace */
/* /api/saleplaces */
module.exports.saleplaceCreate = function(req, res) {
  console.log(req.body);
  SPlace.create( req.body
/*    {
    _id: '10600',
       'rec#': 6,
         Name: '0.0',
     FullName: 'дом 6 ряд 00 место 00',
         Moll: 1,
        Floor: 0,
       Sector: 6,
         Line: 0,
        Place: 0,
      Address: 'Витебск, Смоленский рынок',
  Description: 'р0м0 KALinux',
        Notes: 'Testing value',
         Host: 'KALINUX'
  }*/
  , 
  function(err, splace) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(splace);
      sendJSONresponse(res, 201, splace);
    }
  });
};


/* PUT /api/saleplaces/:placeId */

module.exports.saleplaceUpdateOne = function(req, res) {
  //console.log(req.body);
  if (!req.params.placeId) {
    sendJSONresponse(res, 404, {
      'message': 'Not found, saleplace.id is required'
    });
    return;
  }
  //console.log(req.params.placeId);
  if (req.params.placeId != '10600') {
    sendJSONresponse(res, 404, {
      'message': 'Not found, testing saleplace.id is 10600'
    });
    return;
  }
  SPlace
    .findById(req.params.placeId)
    .exec(
      function(err, saleplace) {
        if (!saleplace) {
          sendJSONresponse(res, 404, {
            'message': 'saleplace.id not found'
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        saleplace['rec#'] = req.body['rec#'];
        saleplace.Name = req.body.Name;
        saleplace.FullName = req.body.FullName;
        saleplace.Moll = req.body.Moll;
        saleplace.Floor = req.body.Floor;
        saleplace.Sector = req.body.Sector;
        saleplace.Line = req.body.Line;
        saleplace.Place = req.body.Place;
        saleplace.Address = req.body.Address;
        saleplace.Description = req.body.Description;
        saleplace.Notes = req.body.Notes;
        saleplace.Host = req.body.Host;
        
        saleplace.save(function(err, splace) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, splace);
          }
        });
      }
  );
};


/* DELETE /api/saleplaces/:placeId */

module.exports.saleplaceDeleteOne = function(req, res) {
  if (req.params.placeId != '10600') {
    sendJSONresponse(res, 404, {
      'message': 'Not found, testing saleplace.id is 10600'
    });
    return;
  }
  var saleplaceId = req.params.placeId;
  if (saleplaceId) {
    SPlace
      .findByIdAndDelete(saleplaceId,
        function(err) { 
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log('SalePlace id ' + saleplaceId + ' deleted');
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      'message': 'No saleplace.id'
    });
  }
};



/** 
  * GET a list of all saleplaces
  *
  **/

module.exports.saleplacesListAll = function(req, res) {
  console.log('Finding sale places details', req.params);
  if (req.params) { //={}
    SPlace
      .find({}) //req.params)
      .exec(function(err, saleplaces) {
        if (!saleplaces) {
          sendJSONresponse(res, 404, {
            'message': 'saleplaces not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log('saleplaces already get.');
        sendJSONresponse(res, 200, saleplaces);
      });
  } else {
    console.log('No params for all-list specified');
    sendJSONresponse(res, 404, {
      'message': 'No all-list params in request'
    });
  }
};