
const { isHeroku } = require( './serverconfig' );

function info( ...args ) { // Все аргументы = массив аргументов
    
    let prefix = '';
    if( !isHeroku ) {
        //let nowTime = (new Date()).toISOString();
        let nowTime = (new Date()).toUTCString();
        prefix = `[${nowTime}] `;
    }
    console.info( prefix + 'I:', ...args ); // Распаковка массива в значения
    // После `I:` есть пробел. `,` вставляет пробел. 
}

module.exports = {
    info,
};
