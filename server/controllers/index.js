// require all controllers
// and this entry js file is required by server/server.js

/**
 * @param app {Object} - express instance
 * every controller required will set it own middleware
 *
 */
function requireCtrls(app) {
  require('./projects')(app);
  require('./home')(app);
  // require root last
  require('./root')(app);
}

module.exports = requireCtrls;
