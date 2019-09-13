
const { needUnitsForPeriod } = require('../../utils/rsis');

const 
//  expect = require('chai').expect,
    should = require('chai').should()
//  , assert = require('assert')
;

const period = { sp:12, mp:24, lp:36, xlp:96 };
const item = {
  gid : "2012030106",
  name : "Джаф.лЗ ФруктоАссорт 100г",
  gr : "10",
  qpu : 20,
  from : "RU,BY",
  frAct : 6,
  fqL : 0.5,
  fqA : 0.4166,
  fqM : 0.8333,
  valid : 24,
};
const result = {  
  sp : [0,0,1],
  mp : [1,1,1],
  lp : [1,1,2],
  xlp: [3,2,4]
};
const errResult = [1,0,1];

console.log('period:sp ', needUnitsForPeriod(item, period.sp));

describe("function needUnitsForPeriod() testing ...", () => 
{
  ['sp','mp','lp','xlp']
  .forEach( prd => {
    it(`period: ${period[prd]} result ${result[prd]}.`, () => {
      let str = needUnitsForPeriod(item, period[prd]).toString();
      str.should.be.equal(result[prd].toString());
    });  
  });

  it(`period: ${period.sp} result ${result.sp}.`, () => {
    let str = needUnitsForPeriod(item, period.sp).toString();
    str.should.not.be.equal(errResult.toString());
  });  

});


