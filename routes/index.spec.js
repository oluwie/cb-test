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

test('return 404 for undefined routes', async t => {
  const response = await request(createServer()).get('/foo');
  const mockBody = {
    code: 404,
    data: {
      error: 'This is not the endpoint you\'re looking for'
    }
  };
  t.is(response.status, 404, 'returns a 404 status code');
  t.deepEqual(response.body, mockBody, 'returns 404 body');
});

test('returns content', async t => {
  const response = await request(createServer()).get('/content');
  const mockBody = { foo: 'foo' };
  t.deepEqual(response.body, mockBody, 'returns expected body');
});


function createServer(mockData) {
  const app = new Koa();
  app.use(routes.routes());

  return app.listen();
}
