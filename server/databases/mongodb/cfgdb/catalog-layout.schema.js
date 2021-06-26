const debug = require( 'debug' )( 'api:config:catalogLayouts' );

const { Schema } = require( 'mongoose' );
const UUID = require( 'uuid' );

const PATH_DEFINITION = require( '../schema.paths-definitions' );


const xlGroup = new Schema({

    lid: PATH_DEFINITION.GROUP_LID,
    gid: PATH_DEFINITION.GROUP_GID,
    title: {
        type: Schema.Types.String,
        required: true,
    },
    index: {
        type: Schema.Types.Number,
        min: 1,
        required: true,
        set: v => Math.round(v),
    }
});



const xlLayoutItem = new Schema({

    lid: PATH_DEFINITION.ITEM_LID,
    gid: PATH_DEFINITION.ITEM_GID,
    grp: {
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
    },
    qpul: {
        // quantity per unit local (складской)
        // Для оперативного измененния количества 
        // в коробке, не затрагивая Nomenklature
        // Если !qpu - то используем основной qpu
        type: Schema.Types.Number,
        min: 0,
        //default: 0,
        set: v => Math.round(v),
    },
    fhl: {
        // force highlight
        // Обязательное выделение позиции при печати
        // 0 - Нет выделения
        // 0b01 - Названия
        // 0b10 - цены
        type: Schema.Types.Number,
        min: 0,
        max: 3,
        default: 0,
        set: v => Math.round(v),
    },
    part: {
        // part of printed invoice
        // 0 - Основной
        // 1 - Доп1 (multi-позиции)
        // 2 - Доп2 (отсутствуют на складе)
        // 3 - Доп3 (нет в наличии, остаток = 0)
        // 4 - Названия групп (xlGroups)
        type: Schema.Types.Number,
        min: 0,
        max: 4,
        default: 0,
        set: v => Math.round(v),
    },
    fal: {
        // force-add list
        // позиция входит в список для
        // обязательной добавки
        type: Schema.Types.Number,
        min: 0,
        max: 1,
        default: 0,
        set: v => Math.round(v),
    },
});



const catalogLayout = new Schema({

    uuid:{
        type: Schema.Types.String,
    },
    client: {
        // Для какого клиента каталог
        type: String, 
        required: true, 
        enum: [ 'excel', 'web' ],
        default: 'web',
    },
    list: {
        // вид (вариант) списка 
        // тип торговой точки: 'cofeeTea',
        type: Schema.Types.String, 
        required: true,
        enum: [ 'coffeeTea' ],
        default: 'coffeeTea',
    },
    /*type: {
        // Вариант каталога
        type: Schema.Types.String, 
        required: true,
        enum: [ 'products' ],
    },*/
    caption: {
        // Заголовок/Название каталога
        type: Schema.Types.String, 
        required: false,
    },
    notes: {
        // Описание каталога
        type: Schema.Types.String, 
        required: false,
    },
    since: {
        // С какого момента действует
        // null - для первого каталога
        type: Schema.Types.Date,
    },
    until: {
        // До какого момента действовал
        // null - для текущего каталога
        type: Schema.Types.Date,
        default: null,
    },
    prev: {
        // Предыдущий каталог
        // null - если первый
        type: Schema.Types.ObjectId,
    },
    next: {
        // Следующий каталог
        type: Schema.Types.ObjectId,
    },
    xlGroups: {
        type: [ xlGroup ],
    },
    items: {
        // Массив записей о позициях
        type: [ xlLayoutItem ]
    },
    host: {
        // Откуда сохранен каталог
        type: Schema.Types.String, 
        required: true,
    },
    updatedAt: {
        // Когда сохранен
        type: Schema.Types.Date, 
        default: Date.now,
    }
});

catalogLayout.pre( 'save', async function (/*next*/) {
    // Pre middleware function
    if( !this.uuid ) {
        this.uuid = UUID.v4();
        debug( `pre(save): ${this.uuid}` );
    }
    //return next();
});


module.exports = catalogLayout;
