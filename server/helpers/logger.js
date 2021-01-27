
const { isHeroku } = require( './serverconfig' );


module.exports = function (ticker = '') {

    function info( ...args ) { // Все аргументы = массив аргументов
    
        let prefix = '';
        let suffix = ticker == ''
            ? ''
            : ' ' + ticker
        ;

        if( !isHeroku ) {
            //let nowTime = (new Date()).toISOString();
            let nowTime = (new Date()).toUTCString();
            prefix = `[${nowTime}] `;
        }
        console.info( 
            prefix + 'I:' + suffix,
            ...args ); // Распаковка массива в значения
        // После `suffix` есть пробел. `,` вставляет пробел. 
    }

    return ({
        info,
    });
};
