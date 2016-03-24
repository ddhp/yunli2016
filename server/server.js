var express = require('express');
var app = express();

// setup template engine
var exphbs = require('express-handlebars');
var path = require('path');
var hbs = exphbs.create({
  /* config */
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'server/views/layouts',
  partialsDir: 'server/views/partials',
  helpers: require('./helpers')
});
app.engine('.hbs', hbs.engine); // first param must be '.hbs', yet know the reason
app.set('views', path.join(__dirname, './views'));
app.set('view engine', '.hbs');

// setup io namespaces
var http = require('http').Server(app);

// setup middlewares here
require('./middlewares')(app);

// setup controllers
require('./controllers')(app);

// last middleware for err handling
require('./middlewares/error')(app);

module.exports = http;
