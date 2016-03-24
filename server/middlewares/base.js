var express = require('express');
var router = express.Router();

var debug = require('debug')('http');

router.use(function (req, res, next) {
  // Format: METHOD URL CURRENT_TIME
  debug(req.method + ' ' + req.originalUrl);
  next();
});

module.exports = router;
