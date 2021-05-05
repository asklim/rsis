const mongoose = require( 'mongoose' );



/** 
 * @name WeekNaturalRecord
 * @description
 * Запись с данными об товарной позиции <gid> в документе
 * описывающем неделю # <WeekNatural.id>
 * @property {String} gid  - Global id of product item
 * @property {String} name - Название продукта (InnerName)
 * @property {String} gr   - Группа, используется для сортировки: 10 .. 99
 * @property {Number} qpu  - Quantity per Unit - Количество штук в коробке 
 * @property {String} from - варианты канала/ов поставки товара: "BY,RU,EU" | "BY,RU" - строка со значениями, разделенными запятыми
 * @property {Number} frAct - Остаток товара на фирме (Актуальный)
 * @property {Number} fqL   - Частота продаж в день (Last - последняя неделя)
 * @property {Number} fqA	- Частота продаж в день (Average - за 6 недель) 
 * @property {Number} fqM	- Частота продаж в день (Maximal - за 6 недель)
 * @property {Number} valid	- Срок годности в месяцах 
 *
**/
// eslint-disable-next-line no-unused-vars
const WeekNaturalRecord = new mongoose.Schema({

    gid: {
        type: String, 
        required: true, 
        unique: true
    },

    name: {
        type: String, 
        required: true, 
    },

    gr: {
        type: String, 
        required: true, 
    },

    qpu: {
        type: Number, 
        min: 1,
        required: true, 
    },

    from: {
        type: String, 
        //required: true, 
    },

    frAct: {
        type: Number, 
    },

    fqL: {
        type: Number, 
    },

    fqA: {
        type: Number, 
    },

    fqM: {
        type: Number, 
    },

    valid: {
        type: Number, 
    },
});



/**
 * @name WeekNatural
 * @summary Week Summary Natural
 * @description Схема данных для расчета закупки
 * @property {Number} id   - number of week of 21 century
 * @property {String} type - тип отчета. ???? 
 * @property {String} host      - имя компьютера, сделавшего изменение.
 * @property {Date}   updatedAt - дата изменений
 * @property {Object} body - данные в зависимости от типа агента
 * 
**/
const WeekNatural = new mongoose.Schema({

    id: {
        type: Number, 
        required: true, 
        unique: true
    },

    type: {
        type: String, 
        required: true,
        lowercase: true
    },

    body: {
        type: [ WeekNaturalRecord /*mongoose.Mixed*/]
    },

    host: {
        type: String, 
        required: true
    },

    updatedAt: {
        type: Date, 
        'default': Date.now
    }

});

module.exports = WeekNatural;
