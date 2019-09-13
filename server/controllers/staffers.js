"use strict";
//var mongoose = require('mongoose');
var db = require('../databases/databases').getDB('config');
var Staffer = db.model('Staffer');

var sendJSONresponse = function(res, status, content) {
  console.log(`staffers: ${content}`);
  res.status(status);
  res.json(content);
};



/** 
  * GET a staffer info by the id 
  *
  **/
module.exports.stafferReadOne = function(req, res) {

  console.log('RO: Finding staffer details', req.params);
  console.log('RO: Finding staffer query', req.query);
  
  if (req.params && req.params.stafferId) {
    Staffer
      .findById(req.params.stafferId)
      .exec(function(err, staffer) {
        if (!staffer) {
          sendJSONresponse(res, 404, {
            'message': 'staffer.Id not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(staffer);
        sendJSONresponse(res, 200, staffer);
      });
  } else {
    console.log('No staffer.Id specified');
    sendJSONresponse(res, 404, {
      'message': 'No staffer.Id in request'
    });
  }
};

/* POST a new staffer */
/* /api/staffers */
module.exports.stafferCreate = function(req, res) {
  console.log(req.body);
  Staffer.create( req.body
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
  function(err, staff) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(staff);
      sendJSONresponse(res, 201, staff);
    }
  });
};

/* PUT /api/staffers/:stafferId */
module.exports.stafferUpdateOne = function(req, res) {
  //console.log(req.body);
  if (!req.params.stafferId) {
    sendJSONresponse(res, 404, {
      'message': 'Not found, staffer.id is required'
    });
    return;
  }
  //console.log(req.params.stafferId);
  if (req.params.stafferId != '1060') {
    sendJSONresponse(res, 404, {
      'message': 'Not found, testing staffer.id is 1060'
    });
    return;
  }
  Staffer
    .findById(req.params.stafferId)
    .exec(
      function(err, staff) {
        if (!staff) {
          sendJSONresponse(res, 404, {
            'message': 'staffer.id not found'
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        /*
        staff['rec#'] = req.body['rec#'];
        staff.Role = req.body.Role;
        staff.BlackList = req.body.BlackList;
        staff.Status = req.body.Status;
        staff.LastName = req.body.LastName;
        staff.FirstName = req.body.FirstName;
        staff.MiddleName = req.body.MiddleName;
        staff.Initials = req.body.Initials;
        staff.FIO = req.body.FIO;
        staff.Nick = req.body.Nick;
        staff.Nick2 = req.body.Nick2;
        staff.intPrefix = req.body.intPrefix;
        staff.intName = req.body.intName;
        staff.Birthday = req.body.Birthday;
        staff.PID = req.body.PID;
        staff.Passport = req.body.Passport;
        staff.DateExpiry = req.body.DateExpiry;
        staff.Email = req.body.Email;
        staff.Ot = req.body.Ot;
        staff.To = req.body.To;
        staff.Host = req.body.Host;
        */

        Object.assign(staff, req.body);

        staff.save(function(err, staffer) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, staffer);
          }
        });
      }
  );
};


/* DELETE /api/staffers/:staffId */
module.exports.stafferDeleteOne = function(req, res) {
  if (req.params.stafferId != '1060') {
    sendJSONresponse(res, 404, {
      'message': 'Not found, testing staffer.id is 1060'
    });
    return;
  }
  var stafferId = req.params.stafferId;
  if (stafferId) {
    Staffer
      .findByIdAndDelete(stafferId,
        function(err) { 
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log('Staffer id ' + stafferId + ' deleted');
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      'message': 'No staffer.id'
    });
  }
};



/** 
  * GET a list of all staffers
  *
  **/

module.exports.staffersListAll = function(req, res) {
  console.log('LA: Finding staffer`s details', req.params);
  console.log('LA: Finding staffer query', req.query);
  if (req.params) { //={}
    Staffer
      .find({}) //req.params)
      .exec(function(err, staffers) {
        if (!staffers) {
          sendJSONresponse(res, 404, {
            'message': 'staffers not found'
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log('Staffers already get.');
        sendJSONresponse(res, 200, staffers);
      });
  } else {
    console.log('No params for all-list specified');
    sendJSONresponse(res, 404, {
      'message': 'No all-list params in request'
    });
  }
};