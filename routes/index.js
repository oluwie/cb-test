
// Required Node Modules
const ROUTER = require('koa-router');

// Router
const ROUTE = ROUTER();

// Routes
ROUTE.get('fetchContent', '/content', contentHandler);

ROUTE.post('postContent', '/postFoo', fooPostHandler);

ROUTE.all('catchAll', '*', errorHandler);

// Route Handlers

/**
 * contentHandler
 * Fetches main content and returns JSON payload
 * @param  {Koa.context} context the context object of the route
 * @return {Koa.response}        the JSON body of the response
 */
async function contentHandler(context) {
  const ctx = context;

  ctx.status = 200;
  ctx.body = {
    foo: 'foo'
  };
  return ctx.body;
}


function fooPostHandler(context) {
  const ctx = context;

  ctx.status = 200;
  ctx.body = {
    foo: 'foo'
  };

  return ctx.body;
}

/**
 * errorHandler
 * Catch All handler for undefined routes
 * @param  {Koa.context} context the context object of the route
 * @return {Koa.response}        the JSON body of the response
 */
async function errorHandler(context) {
  const ctx = context;
  const code = 404;
  ctx.status = code;
  ctx.body = {
    code,
    data: {
      error: 'This is not the endpoint you\'re looking for',
    },
  };

  return ctx.body;
}

// Export Router
module.exports = ROUTE;
