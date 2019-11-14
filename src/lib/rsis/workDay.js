const { week21c } = require('../utils');
const { nextWorkDayTime } = require('../../config/enumValues');

const ONE_DAY = 86400000;

/**
 * Дата смещенная на +-offset дней от сейчас
 * и до 14:00 является предыдущим днём (задаётся delta)
 */
const theWorkDay = ( unixTime, offset = 0 ) => {
  return new Date( 
    unixTime + offset*ONE_DAY - nextWorkDayTime.delta 
  );
};

/**
 * @name date
 * @param {Number} offset
 * ******************* НЕ РАБОТАЕТ ***************************
 * В рабочую дату не попадает понедельник
 * Если Sun + 1 день то = Tue
 * Если Tue - 1 день то = Sun
 * */
const date = ( offset = 0 ) => {  
  let ofsForMonday;
  if(offset === 0) { ofsForMonday = -ONE_DAY; // Mon -> Sun
  } else {
    if(offset > 0) { ofsForMonday = ONE_DAY;  // Mon -> Tue
    } else { 
      ofsForMonday = -2*ONE_DAY; // Mon -> Sat
    }
  }
  const utime = Date.now();
  const dt = theWorkDay( utime, offset );
  //const dt = new Date( Date.now() + offset*ONE_DAY );
  return new Date(
    dt.getDay() === 1    // monday
    ? dt.valueOf() + ofsForMonday
    : dt.valueOf()
  );
};

const today = () => {
  const dt = theWorkDay( Date.now(), 0 );
  return new Date(
    dt.getDay() === 1    // monday -> Sunday
    ? dt.valueOf() - ONE_DAY
    : dt.valueOf()
  );  
};

const week = ( offset = 0 ) => { return week21c( today()) + offset; };

module.exports = {
  week,
  date,
  today,
};
