function setup(app) {
  app.get('/', function (req, res) {
    res.redirect('/projects');
  });
}

module.exports = setup;
