const { Schema } = require( 'mongoose' );



/** 
 * @name ItemProfitRecord
 * @description
 * Запись с данными об товарной позиции <gid> в документе
 * описывающем неделю # <WeekNatural.id>
 * @property {String} gid  - Global id of product item
 * @property {String} name - Название продукта (InnerName)
 * @property {String} gr   - Группа, используется для сортировки: 10 .. 99
 * @property {Number} saled  - 
 * @property {Number} profit - 
 * @property {Number} netTurnover   - 
 * @property {Number} 	-  
 * @property {Number} 	- 
 * @property {Number} 	- 
 *
**/

const profitItemRecord = new Schema({

    _id: {
        type: String, 
        required: true, 
        unique: true,
        alias: 'gid',
    },

    name: {
        type: String, 
        required: true, 
    },

    gr: {
        type: String, 
        required: true, 
    },

    saled: {
        type: Number, 
        required: true, 
    },

    profit: {
        type: Number, 
        required: true, 
    },

    netTurnover: {
        type: Number, 
        required: true, 
    },
});


/**
 * Массив имеет следующее количество элементов:
 * для 'week' - 0..7, 0 - сумма, 1..7 - дни недели
 * для 'quarter' - 0..14, 0 - сумма, 1..14 - недели квартала
 * в 4м квартале может быть 14 недель
 * для 'year' - 0..4, 0 - сумма, 1..4 - кварталы года
 * 
 * @property {[]} profit - Доходность по периодам 
 * @property {[]} salesRevenue - Выручка полученная от продаж по периодам
 * @property {[]} netTurnover - netCosts - Себестоимость проданных товаров
 * @property {[]} salesInvoices - Сумма оформленных продаж на списание товара
 */
const FinanceSummary = new Schema({

    profit: [ Number ],
    salesRevenue: [ Number ],
    netTurnover: [ Number ],
    salesInvoices: [ Number ],

});



const usdWeekRates = new Schema({

    _id: {
        type: String, 
        required: true, 
        enum: [ 'byr', 'rur' ],
    },

    onDate: {
        type: new Schema({

            _id: {
                type: String, 
                required: true,
                unique: true,
                alias: 'isoDate',
            },
            rate: Number,
        }),
        default: {}
    },
});


/**
 * @property {[Number]} usd2byrRates - [0 To 7]
 * @property {} salesPoints - <key>: FinanceSummary
 * Key:  f1, wh1, 10611, 10621, 10614, 10646, 10619
 * name: F1, wh1,   1a,    1b,    4a,    4d,    9a
**/
const FinanceWeekReportBody = new Schema({

    usdRates: { 
        type: usdWeekRates, 
        default: {}, 
    },

    items: {
        type: [ profitItemRecord ],
    },
    
    sellingDays: {
        type: Number, 
        //get: v => Math.round(v),
        set: v => Math.round(v),
        required: true,
        min: 0,
        max: 7,
        default: 6,
        alias: 'days',
    },
    
    salesPoints: { 
        type: Schema.Types.Mixed,
        // Dictionary of FinanceSummary by isoDate
        alias: 'places',
    }, 

    firma: {
        type: FinanceSummary
    },
    
    last4wks: {
        type: FinanceSummary
    },
    
    last5wks: {
        type: FinanceSummary
    },
    

});



/**
 * 
**/
const FinanceQuarterReportBody = new Schema({

});




/**
 * @name FinanceReport
 * @summary Week/Quarter Finance Summary Report
 * @description Схема данных о Финансовых Результатах
 * @property {String} type - тип отчета. < 'profit' |  > 
 * @property {String} period - < 'week' | 'quarter' >
 * @property {Number Int32} pid   - periodId 
 * case period=week: number of week of 21 century: 960 | 1011 
 * case period=quarter: 20201 | 20204 | 20211 
 * @property {Object} body - данные в зависимости от типа агента
 * @property {String} host      - имя компьютера, сделавшего изменение.
 * @property {Date}   updatedAt - дата изменений
 * 
**/
const FinanceReport = new Schema({
    
    type: {
        type: String,         
        enum: [ 'profit' ],
        index: true,
        required: true,
        lowercase: true
    },

    period: {
        type: String,
        enum: [ 'week', 'quarter' ],
        index: true,
        required: true,
        lowercase: true,
    },

    pid: {
        type: Number, 
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: true, 
        index: true
    },

    body: {
        type: Schema.Types.Mixed,
        /* if type is function then:
            TypeError: Invalid schema configuration: 
           `Type` is not a valid type at path `body`. 
           See http://bit.ly/mongoose-schematypes for a list of valid schema types.
        */
        ref: function() {
            switch( FinanceReport.period ) {

                case 'quarter':
                    return FinanceQuarterReportBody;  
                    
                case 'week':
                    return FinanceWeekReportBody;                    

                default:
                    return Schema.Types.Mixed;
            }
        },
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

module.exports = FinanceReport;
