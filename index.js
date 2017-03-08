
// Required Node Modules
const KOA            = require('koa');
const CORS           = require('kcors');
const BODY_PARSER    = require('koa-bodyparser');
const LOGGER         = require('koa-logger');
const RESPONSE_TIME  = require('koa-response-time');
const CONVERT        = require('koa-convert');
const SESSION        = require('koa-generic-session');

// Required Local Modules
const ROUTES = require('./routes');

// ENV Vars
const PORT = 8888;

// App
const APP = new KOA();

// RESPONSE TIME & LOGGING
APP.use(CORS());
APP.use(RESPONSE_TIME());
APP.use(LOGGER());

// BODY PARSER
APP.use(BODY_PARSER({
  onerror: (err, ctx) => {
    ctx.throw(422, 'Error parsing the body information');
  },
}));

APP.use(ROUTES.routes());
APP.use(ROUTES.allowedMethods());

APP.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
