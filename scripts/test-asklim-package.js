/*
const asklim = require( 'asklim/rsis' )();

console.log( "typeof", typeof asklim );
console.log( asklim );
*/

const { needUnitsForPeriod } = require( 'asklim/rsis' )();

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
