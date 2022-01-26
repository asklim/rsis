const log = require( 'loglevel' );
const isHeroku = process.env.DYNO && (process.env.PWD === '/app');
const isSystemdService = (process.stdout.isTTY == undefined);

module.exports = function createLogger (ticker = '') {

    // Замыкаем tickerfix, но не datefix, иначе
    // будет одно и то же время на момент вызова logger.Function()
    const tickerfix = ticker == ''
        ? ''
        : ' ' + ticker
    ;

    function logPrefix (level) {

        const datefix = isHeroku || isSystemdService
            ? ''
            : `[${(new Date()).toUTCString()}] `
        ;
        return `${datefix}${level}${tickerfix}`;
    }

    const debug = (...args) => log.debug( logPrefix( 'DBG' ), ...args );

    const info = (...args) => log.info( logPrefix( 'INF' ), ...args );

    const warn = (...args) => log.warn( logPrefix( 'WRN' ), ...args );

    const error = (...args) => log.error( logPrefix( 'ERR' ), ...args );

    return ({
        trace: (...args) => log.trace( logPrefix( 'TRC' ), ...args ),
        debug,
        info,
        warn,
        error,
    });
};
