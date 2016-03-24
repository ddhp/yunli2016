function setup(app) {
  app.use('/', function (req, res, next) {
    // render 404 except assets request
    if (!/assets/.test(req.path)) {
      res.render('404', {
        layout: false
      });
    } else {
      next();
    }
  });
}

module.exports = setup;
