// const EMPTY_STRING = "";
// const ALL_BASE64_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
// "abcdefghijklmnopqrstuvwxyz" + "0123456789" + "+/";

// const ALL_RUSSIAN = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ" +
//     "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

const UNICODE = `\u{260E}\u{20AA}\u{212E}`;

const data = UNICODE;

const crypto = require('node:crypto');
const hash1 = crypto.createHash('md5');
const hash2 = crypto.createHash('md5');
const hash3 = crypto.createHash('md5');
const hash4 = crypto.createHash('md5');
const hash5 = crypto.createHash('md5');

const val1 = hash1.update( data ).digest('hex');       // string
const val2 = hash2.update( data ).digest('base64');    // string
const val3 = hash3.update( data ).digest('base64url'); // string
const val4 = hash4.update( data ).digest('binary');    // string
const val5 = hash5.update( data ).digest();            // object

console.log(
    'hex   ',    val1.length, val1,                      // typeof val1,
    '\nb64   ',  val2.length, val2,                      // typeof val2,
    '\nb64url',  val3.length, val3,                      // typeof val3,
    '\nbinary',  val4.length, `"${val4}"`, '<- "value"', // typeof val4,
    '\ndefault', val5.length, val5,                      // typeof val5,
    '\n'
);


/**
 * Values of Empty string: ""
 * hex    32 d41d8cd98f00b204e9800998ecf8427e
 * b64    24 1B2M2Y8AsgTpgAmY7PhCfg==
 * b64url 22 1B2M2Y8AsgTpgAmY7PhCfg
 * binary 16 ÔÙ²é        øB~
 * default 16 <Buffer d4 1d 8c d9 8f 00 b2 04 e9 80 09 98 ec f8 42 7e>
 */

/**
 * Values of AllBase64Characters
 * ***
 * hex    32 7845f7eade89338adabfef89bd6e9a5b
 * b64    24 eEX36t6JM4rav++JvW6aWw==
 * b64url 22 eEX36t6JM4rav--JvW6aWw
 * binary 16 "xE÷êÞ3Ú¿ï½n[" <- "value"
 * default 16 <Buffer 78 45 f7 ea de 89 33 8a da bf ef 89 bd 6e 9a 5b>
 */

/**
 * Values of ALL_RUSSIAN
 * ***
 * hex    32 497dd4dca63b3f4062b525e62e13fd6d
 * b64    24 SX3U3KY7P0BitSXmLhP9bQ==
 * b64url 22 SX3U3KY7P0BitSXmLhP9bQ
 * binary 16 "I}ÔÜ¦;?@bµ%æ.ým" <- "value"
 * default 16 <Buffer 49 7d d4 dc a6 3b 3f 40 62 b5 25 e6 2e 13 fd 6d>
 */
