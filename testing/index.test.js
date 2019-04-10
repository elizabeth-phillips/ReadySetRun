const request = require('supertest');
const app = require('../routes/index');

describe('Test the root path', () => {
    test('It should response the GET / method', () => {
        request(app).get('/').expect(200);
    });

    test('It should response the GET /admin/createrunninggroup method', () => {
        request(app).get('/admin/createrunninggroup').expect(200);
    });

    test('It should response the GET /admin/createrace/ method', () => {
        request(app).get('/admin/createrace/').expect(200);
    });

    test('It should response the GET /admin/ method', () => {
        request(app).get('/admin/').expect(200);
    });

    test('It should response the GET /admin/Users method', () => {
        request(app).get('/admin/Users').expect(200);
    });
});