var request = require('supertest');
var app = require('../../../../server');
var expect = require('chai').expect;

describe('GET /', function () {
  it('redirect homepage', function (done) {
    request(app)
      .get('/')
      // .expect('Content-Type', /html/)
      .expect(302, done);
  });

  it('respond a 404 page if no matched route', function (done) {
    request(app)
      .get('/inexist/route')
      .expect('Content-Type', /html/)
      .expect(function (res) {
        expect(/404/.test(res.text)).to.be.true;
      })
      .expect(200, done);
  });
});
