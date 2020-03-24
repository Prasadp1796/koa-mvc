const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const config = require('./config/app_config');
const helmet = require('koa-helmet');
const routing = require('./routes/index');
const session = require('koa-session');

//Database Connectivity
mongoose.connect(config.connectionString, { useNewUrlParser: true,  useUnifiedTopology: true  } );
mongoose.connection.on('error', console.error);

//Session Set Up
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'my-secret-key-koa-js', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};
 
app.use(session(CONFIG, app));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(helmet());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs',
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


//Locals For Views
app.use(async (ctx, next)=>{
  ctx.state.name = ctx.session.emailId;
  await next();
})

//Disable Back Button
app.use(async function (ctx, next) {
  ctx.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  ctx.res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  ctx.res.setHeader('Expires', '-1');
  ctx.res.setHeader('Pragma', 'no-cache');
  await next();
})

//Routing set up 
routing(app);


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
