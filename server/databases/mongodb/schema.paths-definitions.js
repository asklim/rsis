const { Schema } = require( 'mongoose' );


const ITEM_GID = {
    // (g)lobal id - id of product in Nomenklature -
    // Firma`s Global Product Catalog
    type: Schema.Types.Number,
    min: 2000000001,
    max: 2100999999,
    required: true,
    set: v => Math.round(v),
};

const GROUP_GID = {
    // (g)lobal id - id of product`s GROUP in Nomenklature -
    // Firma`s Global Product Catalog
    type: Schema.Types.Number,
    min: 2101000000,
    max: 2199999999,
    required: true,
    set: v => Math.round(v),
};


const ITEM_LID = {
    // (l)ocal id - line`s numbers in ExcelClient
    // range: 1000 .. 1507 .. 1680
    type: Schema.Types.Number,
    min: 1000,
    max: 1680,
    required: true,
    set: v => Math.round(v),
};

const GROUP_LID = {
    // (l)ocal id - line`s numbers in ExcelClient
    // for GROUP line
    // range: 1010,1020, .. 1080,1090
    type: Schema.Types.Number,
    enum: [1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090],
    required: true,
    set: v => Math.round(v),
};

const STANDART_XL_GROUP = {
    // ExcelClient Group (sort) Index
    // Используется для сортировки позиций
    // 1 - ЧАЙ - листовой, пакетированный
    // 2 - ЧАЙ/НАБОРЫ/Эксклюзив
    // 3 - КОФЕ порошок, гранулир, кристалл, зерно, молотый
    // 4 - КОФЕ > 1000г
    // 5 - КОФЕ/НАБОРЫ
    // 6 - Кофейные Напитки, Цикорий
    // 7 - Какао/Горячий Шоколад
    // 8 - РАЗНОЕ: Сливки, Сахар, Шоколад
    // 9 - БРАК (развакуум)
    type: Schema.Types.Number,
    min: 1,
    max: 9,
    required: true,
    set: v => Math.round(v),
};

module.exports = {

    ITEM_GID,
    ITEM_LID,
    GROUP_GID,
    GROUP_LID,
    STANDART_XL_GROUP,
};
