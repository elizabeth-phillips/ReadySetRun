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

    test('delete from running group', () => {
        let data = {
            "id": 100,
            "name": "TestGroup",
            "pace": "11:53",
            "city": "Fillmore",
            "state": "Texas",
            "zipcode": 95005,
            "phone": "(885) 407-2660"
        }
        request(app)
            .post('/delete/100')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });

    test('post to running group', () => {
        let data = {
            "id": 100,
            "name": "TestGroup",
            "pace": "11:53",
            "city": "Fillmore",
            "state": "Texas",
            "zipcode": 95005,
            "phone": "(885) 407-2660"
        }
        request(app)
            .post('/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });

    test('post to running group', () => {
        let data = {
            "id": 100,
            "name": "TestGroup",
            "pace": "11:53",
            "city": "Fillmore",
            "state": "Texas",
            "zipcode": 95005,
            "phone": "(885) 407-2660"
        }
        request(app)
            .post('/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        // .end((err)=>{
        //     if (err) return done(err);
        //     done();
    });
});