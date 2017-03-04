import test from 'ava';
import sinon from 'sinon';
import http from 'http';
import fixture from '.';

const API_URL = 'http://localhost:8888/content';
let API_SPY;

test.beforeEach(t => {
  API_SPY = sinon.spy(http, 'get');
  fixture();
});

test.afterEach.always('cleanup', t => {
  http.get.restore();
});

test('api endpoint should be called', t => {
  const call = API_SPY.getCall(0) || {};
  t.true(API_SPY.calledOnce, 'http.get was called');
  t.is(call.args[0], API_URL, 'called API url')
});

test('returns json payload', t => {
  console.log(response);
  t.fail();
});
