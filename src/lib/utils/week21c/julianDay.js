/**
 * @name julianDay
 * @param {Date} gregorianDate Gregorian date at local timezone
 * @returns {?long} Number of Julian Day
 * @description Valid from November, 23 -4713
 * или 23(25) Nov 4714г до н.э year A.D.(A.C., B.C.)
 * 1г до н.э. = 0
 * 2г до н.э. = -1
 * 4714г до н.э = -4713
 */
function julianDay( gregorianDate ) {

  const gDate = (typeof gregorianDate == 'object')
              ? gregorianDate 
              : new Date( gregorianDate );
  
  const year = gDate.getFullYear(); // return positiv & negative   
  const month = gDate.getMonth() + 1; //getMonth return 0 .. 11
  const day = gDate.getDate(); // getDate return 1 .. 31

  const a = Math.trunc((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12*a - 3;

  return day + Math.trunc((153*m + 2) / 5)  
         + 365*y - 32045 - Math.trunc(y/100)  
         + Math.trunc(y/4) + Math.trunc(y/400);
}

module.exports = {
  julianDay
};
// TODO
// Надо уточнять правильность работы функции
// раньше 1901 года.
// В 1900г была коррекция 29 февраля.
/*
почти каждый век происходит смещение грегорианского 
календаря относительно юлианского
Юлианский год на 11 мин 14сек длиннее тропического, 
а грегорианский длиннее только на 26сек
поэтому дни юлианского года убегают вперед.

Для коррекции каждый 100 год вводят 29 февраля в 
Юлианском году

Переход на григорианский календарь был в 1582 году
и отставание юлианского (стар.стиль) от 
грегорианского (нов.стиль) было 10 суток.
Каждые 400 лет разница увеличивается на 3 суток:
1600г +0, 1700г +1, 1800г +1, 1900г +1, 2000г +0,
потому что 1600 и 2000 - високосные в обоих календарях. 
1500г +1 1100г +1  700г +1  300г+1
1400г +1 1000г +1  600г +1  200г ??
1300г +1  900г +1  500г +1  100г ??
1200г +0  800г +0  400г +0  

*/