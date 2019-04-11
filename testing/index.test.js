process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/index');

describe('Test the root path', () => {
    test('It should response the GET / method', async () => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200);
    });

    test('It should response the GET /admin/createrunninggroup method', () => {
        request(app)
        .get('/admin/createrunninggroup')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200);
    });

    test('It should response the GET /admin/createrace/ method', () => {
        request(app)
        .get('/admin/createrace/')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200);
        // .end(function(err, res){
        //     if (err) throw err;
        // });
    });

    test('It should response the GET /admin/ method', () => {
        request(app)
        .get('/admin/')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200)
        // .end(function(err, res){
        //     if (err) throw err;
        // });
    });

    test('It should response the GET /admin/Users method', () => {
        request(app)
        .get('/admin/Users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should response the GET /admin/Users method', () => {
        request(app).get('/admin/User')
        .expect(500);
    });
});