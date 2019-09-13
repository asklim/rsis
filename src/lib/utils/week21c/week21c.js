
const { julianDay } = require('./julianDay');
const JDN_of_20010101 = 2451911; 
// first day of XXI century: Jan 01, 2001

/**
 * @name week21c
 * @param {DateTime} gregorianDate on local time
 * @returns {?long} Week Number of gregorianDate
 *                  Jan 01, 2001, Monday 
 *                  - begin of week21c = #1
 * @description week21c('2001-01-01') = 1
 */
function week21c( gregorianDate ) {

  const gDate = (typeof gregorianDate == 'object')
              ? gregorianDate 
              : new Date( gregorianDate );
  
  //console.log(`argum = ${gregorianDate}`);
  //console.log(`gDate = ${gDate}`);
  
  const diff = julianDay(gDate) - JDN_of_20010101;
  //console.log(`diff = ${diff}`);

  return Math.floor(diff/7)+1;
         /*(diff<0) 
         ? Math.trunc((diff+1)/7)
         : Math.trunc(diff/7)+1;*/
}

module.exports = {
  week21c
};