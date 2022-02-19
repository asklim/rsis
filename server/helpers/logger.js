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

        const datefix = isHeroku || isSystemdService ? ''
            : `[${(new Date()).toUTCString()}] `
        ;
        return `${datefix}${level}${tickerfix}`;
    }

    const color = '\u001B[0;33;40m';
    const end = '\u001B[0m';

    function debugPrefix (level) {

        const datefix = isHeroku || isSystemdService ? ''
            : `[${(new Date()).toISOString()}]`
        ;
        const color = '\u001B[1;33;40m';
        return `${color}${level}${end} ${datefix}${color}${tickerfix}${end}`;
    }


    const debug = (...args) => log.debug( debugPrefix( 'DEBUG' ), color, ...args, end );

    const info = (...args) => log.info( logPrefix( 'INF' ), ...args );

    const warn = (...args) => log.warn( logPrefix( 'WARN' ), ...args );

    const error = (...args) => log.error( logPrefix( 'ERROR' ), ...args );

    return ({
        trace: (...args) => log.trace( debugPrefix( 'TRACE' ), ...args ),
        debug,
        info,
        warn,
        error,
    });
};
