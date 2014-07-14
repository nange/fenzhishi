/**
 * 程序入口
 *
 */

var koa = require('koa');
var router = require('koa-router');
var session = require('koa-session');
var hbs = require('koa-hbs');
var staticSer = require('koa-static');
var config = require('./config');
var localRouter = require('./router');

var app = koa();

if (app.env !== 'production') {
  app.use(staticSer('./public'));
}
app.use(session());
app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  partialsPath: __dirname + '/views/partials',
  layoutsPath: __dirname + '/views/layouts',
  defaultLayout: 'mainLayout',
  extname: '.html'
}));

app.use(router(app));

localRouter(app);


app.listen(3000);

console.log('server start listening on 3000');