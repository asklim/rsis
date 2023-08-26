const debug = require('debug')('api:reports:dailyReport');

const { Schema } = require('mongoose');
const UUID = require('uuid');

const PATH_DEFINITION = require('../schema.paths-definitions');



const salePlaceSummary = new Schema({

    place: {
        type: Schema.Types.String,
        required: true,
    },
    seller: {
        type: Schema.Types.String,
        required: true,
    },
    revenue: {
        // Выручка торговой точки в валюте продаж (LC)
        type: Schema.Types.Number,
        required: true,
    },
    invoices: {
        // Сумма всех оформленных продаж (счетов-фактур)
        // торговой точки в валюте продаж (LC)
        type: Schema.Types.Number,
        required: true,
    },
    profit: {
        // Доход торговой точки в валюте учёта (usd)
        type: Schema.Types.Number,
        required: true,
    },
    costs: {
        // Учётная стоимость (себестоимость) проданного товара
        // торговой точки в валюте учёта (usd)
        type: Schema.Types.Number,
        required: true,
    }
});


const summarySection = new Schema({

    usdRate: {
        // учётный курс 1$ за валюту продаж
        // LC-local currency 1usd = 2.60 BYN
        type: Schema.Types.Number,
        required: true,
    },
    revenue: {
        // Выручка филиала в валюте продаж (LC)
        type: Schema.Types.Number,
        required: true,
    },
    invoices: {
        // Сумма счетов-фактур
        // Сумма всех оформленных продаж по всем
        // торговым точкам филиала в валюте продаж (LC)
        type: Schema.Types.Number,
        required: true,
    },
    profit: {
        // Доход филиала в валюте учёта (usd)
        type: Schema.Types.Number,
        required: true,
    },
    costOfSales: {
        // Учётная стоимость (себестоимость) проданного товара
        // филиала в валюте учёта (usd)
        type: Schema.Types.Number,
        required: true,
    },
    salePlaces: {
        type: [ salePlaceSummary ],
        required: true,
    }
});


const topSalesItemInfo = new Schema({

    gid: PATH_DEFINITION.ITEM_GID,
    name: {
        type: Schema.Types.String,
    },
    group: PATH_DEFINITION.STANDART_XL_GROUP,
    revenue: {
        // Выручка этой позиции в валюте продаж (LC)
        type: Schema.Types.Number,
        required: true,
    },
    daySold: {
        // продано продажных-единиц товара
        // Продажная единица - за которую установлена цена
        // Учётная-единица / KOut = Продажная-единица
        type: Schema.Types.Number,
        required: true,
    },
    soldBy: {
        // Dictionary of <saleplace sales>:
        // <spId>: {
        //     name: <short-place-name>,
        //     sold: <soldValue>
        // }
        type: Schema.Types.Mixed,
        required: true,
    }
});


const topProfitItemInfo = new Schema({

    gid: PATH_DEFINITION.ITEM_GID,
    name: {
        type: Schema.Types.String,
    },
    group: PATH_DEFINITION.STANDART_XL_GROUP,
    profit: {
        // Доход этой позиции за день в валюте учёта (usd)
        type: Schema.Types.Number,
        required: true,
    },
});


const dailyReport = new Schema({

    uuid: {
        type: Schema.Types.String,
    },
    onDate: {
        // На какую дату отчет (ISO 8601)
        type: Schema.Types.String,
        required: true,
    },
    filial: {
        // Для какого клиента report
        type: String,
        required: true,
        enum: [ 'frm', 'filial1', 'filial2' ],
        default: 'filial1',
    },
    creator: {
        // Какой клиент создал report
        // На переходном периоде может быть два отчёта от
        // разных <creator>, в том числе для сравнения
        type: String,
        required: true,
        enum: [ 'mainsm', 'rsisjs' ],
        default: 'mainsm',
    },
    caption: {
        // title of report
        type: Schema.Types.String,
        required: false,
    },
    notes: {
        // description of report
        type: Schema.Types.String,
        required: false,
    },
    created: {
        // Когда создан на клиенте (ISO 8601)
        //
        type: Schema.Types.Date,
    },
    summary: {
        // Суммарная информация о торговом дне
        type: summarySection,
        required: true,
    },
    topSales: {
        // Массив записей о позициях с максимальными
        // продажами за день по выручке или количеству
        type: [ topSalesItemInfo ],
        required: true,
    },
    topProfit: {
        // Массив записей о позициях с максимальным
        // дневным доходом ( day profit )
        type: [ topProfitItemInfo ],
        required: true,
    },
    host: {
        // Откуда сохранен каталог
        type: Schema.Types.String,
        required: true,
    },
    updatedAt: {
        // Когда сохранен
        type: Schema.Types.Date,
        //default: Date.now,
    }
});


// @ts-ignore
dailyReport.pre('save', async function (next) {
    // Pre middleware function
    if( !this.uuid ) {
        this.uuid = UUID.v4();
        debug(`pre(save): ${this.uuid}`);
    }
    if( !this.updatedAt ) {
        this.updatedAt = new Date( Date.now());
    }
    next();
});


module.exports = dailyReport;
