const { Schema } = require( 'mongoose' );

/**
 * @name Agent
 */
const agentSchema = new Schema({

    id: {
        /* id агента в контексте type*/
        type: Schema.Types.String, 
        required: true,
    },
    type: {
        /*  тип агента. Возможные варианты:
         *   staffer     - сотрудники 
         *   saleplace   - места реализации
         *   supplier    - поставщики
         *   wholesale   - оптовые покупатели
         *   warehouse   - склады
         *   legalentity - юр.лицо (ИП)
         *   buyer       - покупатели (со склада) */
        type: Schema.Types.String, 
        required: true,
        lowercase: true,
    },
    group: {
        /* - разные группы в каждом типе
         *   staffer - DA = Document Accounting,
         *           - OM = Order Manager,
         *           - SP = Seller Person
         *   saleplace - moll1 (смоленский рынок)
         *   supplier  - BY, RU, EU, ????1BY, LM
         *   wholesale - cafe
         *   warehouse - frm, f1 */
        type: Schema.Types.String,
        lowercase: true,
    },
    body: {
        // - данные в зависимости от типа агента
        type: Schema.Types.Mixed,
    },
    host: {
        // - имя компьютера, сделавшего изменение.
        type: Schema.Types.String, 
        required: true,
    },
    updatedAt: {
        // - дата изменений
        type: Schema.Types.Date, 
        default: Date.now,
    }
});

module.exports = agentSchema;
