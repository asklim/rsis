import trimAll from './trimAll.js';

/**
 *
 */
const WHITESPACE = `${' '}`;
const toKebabCase = (str) => trimAll( str ).
    replaceAll( WHITESPACE, '-').
    toLowerCase();

export default toKebabCase;
