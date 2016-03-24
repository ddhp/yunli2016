var expect = require('chai').expect;

describe('Helpers Index JS', function () {
  var helpers;
  beforeEach(function () {
    helpers = require('../../../../helpers/index');
  });

  it('can do assert', function () {
    expect(true).to.be.true;
  });

  it('should have yell helper', function () {
    expect(helpers.yell).to.exist;
  });
});
