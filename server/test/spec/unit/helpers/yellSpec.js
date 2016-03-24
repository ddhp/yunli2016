var expect = require('chai').expect;

describe('Yell Helper', function () {
  var yell;
  beforeEach(function () {
    yell = require('../../../../helpers/yell');
  });

  it('upper case input message', function () {
    expect(yell('lower case')).to.equal('LOWER CASE');
  });
});
