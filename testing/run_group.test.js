process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/running_group');

describe('Test the paths for Running Group', () => {
    test('It should response the GET / method', () => {
        request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
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
        .get('/250')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    });

    test('It should response the GET /delete/:id method', () => {
        request(app)
        .get('/delete/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('It should response the GET /delete/:id method', () => {
        request(app)
        .get('/delete/400')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    });

    test('It should response the GET /delete/:id method', () => {
        request(app)
        .get('/delete/200')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        
    });
});

describe('Test the paths for Running Group', () => {
    test('post to running group', ()=>{
        request(app).post("/")
        .expect(302)
    })
});

describe('Test the paths for Race', () => {
    test('post to running group', ()=>{
        request(app).post("/delete/4")
        .expect(302)
    })
});