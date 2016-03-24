function setup(app) {
  app.use(function (err, req, res, next) {
    // we can distinquish req type here
    // and do corresponding behavior
    // e.g if req.xhr then response 500
    // else render a error template (redirect to homepage in 1s)
    console.log(err);
    res.send('app crashes with ' + err);
  });
}

module.exports = setup;
