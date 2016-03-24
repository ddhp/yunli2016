function setup(app) {
  app.get('/projects', function (req, res) {
    res.render('projects', {
      // layout: 'mainFluid',
      // images: thumbnailMocks.slice(2, 12)
    });
  });
}

module.exports = setup;
