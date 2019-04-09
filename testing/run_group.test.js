const request = require('supertest');
const app = require('../routes/running_group');

describe('Test the root path', function() {
    test('It should response the GET method', function (done) {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    },10000);
});

// describe('Test the root path', function() {
//     test('It should response the GET method', function (done) {
//         request(app.use(app)).get('/').end()
//         },10000);
//     });
