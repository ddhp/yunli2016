/**
 * entry.js listen to window.onload
 * and instantiate router which would load correspond controller
 * inside specified `path` (see router.js)
 *
 */
var routerConfig = {
  // path to source files which this entry file would require
  path: 'controllers',
  // assume client is visiting '/my-page'
  // router would get './' + this.path + '/my-page.js' by default
  // set custom map here
  pathMap: {
    '/': '/home',
    // '/go-premium': '/signup',
    // '/signup-promo': '/signup', // TODO: remove this when promo period ends
  }
};

// specifically require router module
// for dynamic require setup in Router#visit method
var Router = require('./webpack-async-router/router'); 
window.onload = function onload() {
  var router = new Router(routerConfig);
  router.visit();
};
require('./controllers/base');
