var request = require('supertest');
var app = require('../../server');

describe('Get a public asset', function () {
  it('can get css asset', function (done) {
    request(app)
      .get('/assets/css/app.debug.css')
      .expect('Content-Type', /css/)
      .expect(200, done);
  });
});
