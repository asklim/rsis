
var { week21c } = require('./week21c');
var { datesAsString,
      datesAsDate } = require('./dataset-helper');
var expect = require('chai').expect
  , should = require('chai').should();

const assert = require('assert');

describe("function week21c() testing ...", () => {
  
  const dtNow = new Date();
  //let dtNow = Date.now();
  let strNow = dtNow.toString();

  it('week21c( Date ) should be return Number', () => {
    let value = week21c(dtNow);
    assert.equal( typeof(value), 'number' );
  });

  it('week21c( String )should be return Number', () => {
    let value = week21c(strNow);
    assert.equal( typeof(value), 'number' );
  });

  
  datesAsString()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[1]} week.`, () => {
      week21c(elem[0]).should.be.equal(elem[1]);
    });  
  });

  datesAsDate()
  .forEach( elem => {
    it(`${elem[0]} is ${elem[1]} week.`, () => {
      week21c(elem[0]).should.be.equal(elem[1]);
    });  
  });

  //console.log(new Date(-4713,10,23));
  //it('First Julian day (JDN=1) Nov,23 -4713 is week -350271', () => {
  //  week21c(new Date(-4713,10,23)).should.be.equal(-350271);
  //});

  it('42 equal 42', () => {
    expect("42").to.equal("42");
  });

  it('2 equal 2', () => {
    expect("2").to.equal("2");
  });
});