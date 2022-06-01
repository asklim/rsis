import * as debugFactory from 'debug';
//const invoiceDebug = debugFactory( 'invoice');
const debug = debugFactory( 'debug:debug');

localStorage.debug =
    /************  Nothing output  **********/
    // 'debug:*; invoice:*'
    // '*'
    //
    /********  only invoice:* output  *******/
    // ''
    // 'invoice:*'
    //*checked*/ 'debug,invoice:*'
    // 'debug:* invoice:*'
    // 'debug:*,invoice:*'
    //
    /*****  debug:* + invoice:* output  *****/
    //*checked*/ 'debug:*, invoice:*'
    //
    /*******  No invoice, only debug  *******/
    /*checked*/ 'debug:*, -invoice:*'
;

export {
    debugFactory,
    //invoiceDebug,
    debug,
};

