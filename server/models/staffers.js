var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
          _id: {type: String, required: true},
       'rec#': {type: Number, required: true, min: 1},
         Role: {type: String, required: true},
    BlackList: {type: String, required: false},
       Status: {type: String, required: false},
     LastName: {type: String, required: true},
    FirstName: {type: String, required: true},
   MiddleName: {type: String, required: false},
     Initials: {type: String, required: true},
          FIO: {type: String, required: true},
         Nick: {type: String, required: true},
        Nick2: {type: String, required: true},
    intPrefix: {type: String, required: true},
      intName: {type: String, required: true},
     Birthday: {type: Date, required: false},
          PID: {type: String, required: false},
     Passport: {type: String, required: false},
   DateExpiry: {type: Date, required: false},
        Email: {type: String, required: false},
           Ot: {type: Date},
           To: {type: Date},
         Host: {type: String, required: true},
    updatedAt: {type: Date, 'default': Date.now}
});

