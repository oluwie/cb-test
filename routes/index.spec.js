import test from 'ava';
import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from 'koa-router';
import routes from '.';

test('exposes instance of Koa Router', t => {
  t.true(routes instanceof router, 'route is instance of router');
});

test('return 404 for undefined routes', async t => {
  const mockBody = {
    code: 404,
    data: {
      error: 'This is not the endpoint you\'re looking for'
    }
  };
  const response = await request(createServer())
    .get('/foobar');

  t.is(response.status, 404, 'returns a 404 status code');
  t.deepEqual(response.body, mockBody, 'returns 404 body');
});

test('returns content for GET', async t => {
  const mockBody = { foo: 'foo' };
  const response = await request(createServer())
    .get('/content');

  t.is(response.status, 200, 'returns a 200 status code');
  t.deepEqual(response.body, mockBody, 'returns expected body');
});

test('handles POST data and returns json payload', async t => {
  const mockRequest = { 'foo': 'bar' };
  const mockBody = { 'bar': 'foo' };
  const response = await request(createServer())
    .post('/postFoo')
    .set('Content-Type', 'application/json')
    .send(mockRequest);

  t.is(response.status, 200, 'returns a 200 status code');
  t.deepEqual(response.body, mockBody, 'returns expected body');
});


function createServer() {
  const app = new Koa();
  app.use(bodyParser());
  app.use(routes.routes());
  return app.listen();
}
