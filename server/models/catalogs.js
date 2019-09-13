var mongoose = require('mongoose');


module.exports.idMappingExcel = new mongoose.Schema({
  client: {type: String, required: true},       
    list: {type: String, required: true},
    type: {type: String, required: true},         
   items: [[Number]]         
});


/*var onlyIDsSchema = new mongoose.Schema({
  gid: {type: Number, required: true},
  lid: {type: Number, required: true}
});
*/
