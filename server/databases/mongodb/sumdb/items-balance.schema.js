const debug = require( 'debug' )( '-dbg:items-balances:schema' );

const { Schema } = require( 'mongoose' );
const UUID = require( 'uuid' );

//const PATH_DEFINITION = require( '../schema.paths-definitions' );



const oneItemQuantities = new Schema({

    //_id: PATH_DEFINITION.ITEM_GID_KEY,
    nmnl: {
        type: Schema.Types.Number,
        required: true,
    },
    ttl: { // = fact + debt.to - debt.from
        type: Schema.Types.Number
    },
    whs: {
        // Всего на всех складах (TTL)
        type: Schema.Types.Number
    },
    sps: {
        // Всего на торговых точках
        type: Schema.Types.Number
    },
    oper: {
        type: Schema.Types.Number
    },
    fact: {
        type: Schema.Types.Number
    },
    act: { // = fact - nlq - peak
        // Для расчета перемещения/заказа на склад
        type: Schema.Types.Number
    },
    corr: { // = ttl - nmnl > 0 => лишний товар
        // несхождение наличия и документов
        type: Schema.Types.Number
    },
    debt: {
        to: { type: Schema.Types.Number },
        from: { type: Schema.Types.Number }
    },
    nlq: {
        // количество бракованных единиц товара
        type: Schema.Types.Number
    },
    peak: {
        // - setting value
        type: Schema.Types.Number
    },
    rsrv: {
        // - setting value
        type: Schema.Types.Number
    },

});


const itemsBalance = new Schema({

    uuid: {
        type: Schema.Types.String,
    },
    agent: {
        // Какого агента document
        // filial, wh, sp10646, supXXX, clientX
        type: String,
        index: true,
        required: true,
    },
    onDate: {
        // На какую дату документ (ISO 8601, Short date)
        // "2021-09-03"
        type: Schema.Types.String,
        index: true,
        required: true,
    },
    filial: {
        // Для какого клиента document
        type: String,
        required: true,
        enum: [ 'frm', 'filial1', 'filial2' ],
        default: 'filial1',
    },
    creator: {
        // Какой клиент создал document
        // На переходном периоде может быть два документа от
        // разных <creator>, в том числе для сравнения
        type: String,
        required: true,
        enum: [ 'mainsm', 'rsisjs' ],
        default: 'mainsm',
    },
    caption: {
        // title of document
        type: Schema.Types.String,
    },
    notes: {
        // description of document
        type: Schema.Types.String,
    },
    created: {
        // Когда создан на клиенте (ISO 8601, GMT DateTime)
        // "2021-09-03T16:56:35.000Z"
        type: Schema.Types.Date,
    },
    items: {
        // Словарь c количеством по разным типам
        type: Map,
        of: oneItemQuantities,
        required: true,
    },
    host: {
        // Откуда сохранен каталог
        type: Schema.Types.String,
        required: true,
    }
},
{
    timestamps: {}
});


itemsBalance.pre( 'save', async function () {

    // Pre middleware function
    if( !this.uuid ) {
        this.uuid = UUID.v4();
        debug( `[schema] pre(save): ${this.uuid}` );
    }
});

module.exports = itemsBalance;
