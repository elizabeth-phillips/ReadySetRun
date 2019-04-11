process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/race');

describe('Test the paths for Race', () => {
    test('It should response the GET / method', () => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
        // .end(function(err, res){
        //     if (err) throw err;
        // });
    });

    test('It should response the GET /:id', () => {
        request(app)
        .get('/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should response the GET /:id', () => {
        request(app)
        .get('/500')
        .set('Accept', 'application/json')
        .expect(500);
    });


    test('It should response the GET /delete/:id method', () => {
        request(app)
        .get('/delete/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

});