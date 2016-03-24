// middleware process req or res
// or do some extra behavior while request life cycle
// but wouldn't be the end of whole process
//
// end might be `routes` / `controllers`

function setupMiddlewares(app) {
  // base middlewares
  app.use('/', require('./base'));

  // public assets
  // set it here b/c we don't want this route go through passport middleware
  app.use('/assets', require('./public'));

}

module.exports = setupMiddlewares;
