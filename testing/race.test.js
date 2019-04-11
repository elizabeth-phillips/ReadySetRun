process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/race');

describe('Test the paths for Race', () => {
    test('It should response the GET / method', () => {
        request(app).get('/').expect(200);
    });

    test('It should response the GET /:id', () => {
        request(app).get('/1').expect(200);
    });

    test('It should response the GET /delete/:id method', () => {
        request(app).get('/delete/1').expect(200);
    });

});