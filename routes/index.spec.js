import test from 'ava';
import request from 'supertest';
import Koa from 'koa';
import router from 'koa-router';
import routes from '.';

test.beforeEach(t => {});

test.afterEach.always('cleanup', t => {});

test('exposes instance of Koa Router', t => {
  t.true(routes instanceof router, 'route is instance of router');
});

test('return 404 for undefined routes', t => {
  const mockBody = {
    code: 404,
    data: {
      error: 'This is not the endpoint you\'re looking for'
    }
  };
  const response = request(createServer())
    .get('/foobar')
    .expect(404, mockBody);

  // t.is(response.status, 404, 'returns a 404 status code');
  // t.deepEqual(response.body, mockBody, 'returns 404 body');
});

test('returns content for GET', t => {
  const mockBody = { foo: 'foo' };
  const response = request(createServer())
    .get('/content')
    .expect(200, mockBody);

  // t.is(response.status, 200, 'returns a 200 status code');
  // t.deepEqual(response.body, mockBody, 'returns expected body');
});

test('handles POST data and returns json payload', t => {
  const response = request(createServer())
    .post('/postFoo')
    .set('Content-Type', 'application/json')
    .send({ 'foo': 'bar' })
    .expect(200);
});

test('returns 422 for malformed request body', t => {
  const response = request(createServer())
    .post('/postFoo')
    .set('Content-Type', 'application/json')
    .send('test')
    .expect(422);
});

function createServer() {
  const app = new Koa();
  app.use(routes.routes());

  return app.listen();
}
