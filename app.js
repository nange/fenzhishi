/**
 * 程序入口
 *
 */

var koa = require('koa');
var logger = require('koa-logger')
var router = require('koa-router');
var session = require('koa-session');
var locals = require('koa-locals');
var hbs = require('koa-hbs');
var staticServ = require('koa-static');
var mongoose = require('mongoose');
var localRouter = require('./router');
var jwt = require('koa-jwt-comm');

global.rootpath = __dirname;

var app = koa();

app.use(logger());

locals(app);

if (app.env !== 'production') {
  app.use(staticServ('./public'));
}

app.keys = ['fenzhishi'];
app.use(session());

app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  partialsPath: __dirname + '/views/partials',
  layoutsPath: __dirname + '/views/layouts',
  defaultLayout: 'mainLayout',
  extname: '.html'
}));

app.use(jwt({
  secret: 'fenzhishi', 
  passthrough: true
}));

app.use(router(app));

localRouter(app);


app.listen(80);

console.log('server start listening on 80');