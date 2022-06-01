/**
 * Trim ALL whitespaces:
 *  - before
 *  - after
 *  - leave ONLY one between words
 * @param {string} str
 * @returns {string}
 */
const WHITESPACE = `${' '}`;
const trimAll = (str) => str.
     split( WHITESPACE ).
     filter( Boolean ).
     join( WHITESPACE );

export default trimAll;
