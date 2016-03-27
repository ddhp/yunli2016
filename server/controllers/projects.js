function setup(app) {
  app.get('/projects', function (req, res) {
    res.render('projects');
  });
}

module.exports = setup;
