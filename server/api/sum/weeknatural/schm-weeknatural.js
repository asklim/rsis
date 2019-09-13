const mongoose = require('mongoose');

/**
 * @name WeekNatural
 * 
 * @property {String} id - number of week of 21 century
 * @property {String} type - тип отчета. ???? 
 *   
 * @property {String} host - имя компьютера, сделавшего изменение.
 * @property {Date} updatedAt - дата изменений
 * @property {Object} body - данные в зависимости от типа агента
 */
const WeekNatural = new mongoose.Schema({
  id : {
    type: String, 
    required: true, 
    unique: true
  },
  type : {
    type: String, 
    required: true,
    lowercase: true
  },
  body : {
    type : Object
  },
  host : {
    type : String, 
    required : true
  },
  updatedAt : {
    type : Date, 
    'default' : Date.now
  }
});

module.exports = WeekNatural;
