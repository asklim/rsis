
const { workDay } = require('..');

const 
//  expect = require('chai').expect,
    should = require('chai').should()
//  , assert = require('assert')
;

const offsets = [
  -10,-9,-8,-7,-6,-5,-4,-3,-2,-1,
  0,1,2,3,4,5,6,7,8,9,10
];

describe("function work.date() testing ...", () => 
{
  it(`'' date: ${workDay.date()} week: ${workDay.week()}.`, () => {
    workDay.week().should.be.equal(workDay.week());
  });  

  offsets
  .forEach( elem => {
    it(` week: ${workDay.week(elem)} ${elem} date: ${workDay.date(elem)}.`, () => {
      workDay.week(elem).should.be.equal(workDay.week(elem));
    });  
  });
});

describe("function work.week() .today testing ...", () => 
{
  it(`'today' week: ${workDay.week()} date: ${workDay.today()}.`, () => {
    workDay.week().should.be.equal(workDay.week());
  });  
  it(`week+1: ${workDay.week(1)} week-1: ${workDay.week(-1)}.`, () => {
    workDay.week().should.be.equal(workDay.week());
  }); 
  it(`week+2: ${workDay.week(2)} week-2: ${workDay.week(-2)}.`, () => {
    workDay.week().should.be.equal(workDay.week());
  });
});

