/*
console.log( asklim );
*/
const { rsisFactory } = require('asklim');
console.log('typeof', typeof rsisFactory, rsisFactory );
const { needUnitsForPeriod } = rsisFactory();

const item = {
    gid: "2012030106",
    name: "Джаф.лЗ ФруктоАссорт 100г",
    gr: "10",
    qpu: 20,
    from: "RU,BY",
    frAct: 6,
    fqL: 0.5,
    fqA: 0.4166,
    fqM: 0.8333,
    valid: 24,
};

console.log( "typeof", typeof needUnitsForPeriod );

let str = needUnitsForPeriod( item, 36 ).toString();

console.log( "result", str);
