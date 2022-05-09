import * as debugFactory from 'debug';
//const invoiceDebug = debugFactory( 'invoice');
const Debug = debugFactory( 'debug');

localStorage.debug = 'debug:*;invoice:*';

export {
    debugFactory,
    //invoiceDebug,
    Debug,
};

