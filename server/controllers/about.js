function setup(app) {
  app.get('/about', function (req, res) {
    res.render('about');
  });
}

module.exports = setup;
