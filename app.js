/**
 * 程序入口
 *
 */

var koa = require('koa');
var logger = require('koa-logger')
var router = require('koa-router');
var session = require('koa-session');
var locals = require('koa-locals');
var handlebars = require("koa-handlebars");
var staticServ = require('koa-static');
var mongoose = require('mongoose');
var localRouter = require('./router');
var jwt = require('koa-jwt-comm');

global.rootpath = __dirname;

var app = koa();

locals(app);

if (app.env !== 'production') {
  app.use(staticServ('./public'));
}

app.keys = ['fenzhishi'];
app.use(session());
app.use(handlebars({
  cache: app.env !== "development",
  layoutsDir: 'views/layouts',
  defaultLayout: "mainLayout",
  viewsDir: 'views',
  partialsDir: 'views/partials',
  extension: '.html'
}));

app.use(jwt({
  secret: 'fenzhishi', 
  passthrough: true
}));

app.use(router(app));

localRouter(app);


app.listen(80);

console.log('server start listening on 80');