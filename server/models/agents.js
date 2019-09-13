const mongoose = require('mongoose');

/**
 * @name Agent
 * 
 * @property {String} id - id агента в зависимости от type
 * @property {String} type - тип агента. Возможные варианты:
 *   staffer     - сотрудники 
 *   saleplace   - места реализации
 *   supplier    - поставщики
 *   wholesale   - оптовые покупатели
 *   warehouse   - склады
 *   legalentity - юр.лицо (ИП)
 *   buyer       - покупатели (со склада)
 * 
 * @property {String} group - разные группы в каждом типе
 *   staffer - DA = Document Accounting,
 *           - OM = Order Manager,
 *           - SP = Sale Person
 *   saleplace - moll1 (смоленский рынок)
 *   supplier  - BY, RU, EU, 1BY, LM
 *   wholesale - cafe
 *   warehouse - frm, f1
 *   
 * @property {String} host - имя компьютера, сделавшего изменение.
 * @property {Date} updatedAt - дата изменений
 * @property {Object} body - данные в зависимости от типа агента
 */
module.exports = new mongoose.Schema({
         id: {type: String, required: true},
       type: {type: String, 
              required: true,
              lowercase: true},
      group: {type: String,
              lowercase: true},
       body: {type: Object},
       host: {type: String, required: true},
  updatedAt: {type: Date, 'default': Date.now}
});
