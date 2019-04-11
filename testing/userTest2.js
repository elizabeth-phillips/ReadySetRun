process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/user');

// describe('Test the paths for Race', () => {
//     test('It should response the GET / method', () => {
//         request(app.create).expect('getUserLoggedIn').toBe(500);
//     });
// })