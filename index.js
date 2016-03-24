var debug = require('debug')('http');

// setup environment by NODE_ENV=production node index.js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
debug('process.env.NODE_ENV:', process.env.NODE_ENV);

// require controllers
var app = require('./server/server');
var port = process.env.NODE_ENV === 'production' ? 8080 : 7171;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  debug('Express app listening at http://%s:%s', host, port);
});
