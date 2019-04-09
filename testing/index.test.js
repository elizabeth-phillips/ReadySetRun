
// const request = require('supertest');
// const index = require('../routes/index');
 
// describe('Test the root path', () => {
//   test('It should response the GET method', async () => {
//       const response = await request(index).get('/');
//       expect(response.statusCode).toBe(200);
//   });
// })

// describe('Test the root path', () => {
//   test('It should response the GET method', () => {
//       return request(index).get('/').expect(200);
//   });
// })
/**
 * Testing get all user endpoint
 */
// describe('GET /', function () {
//   it('respond with json containing a list of all users', function (done) {
//       request(index)
//           .get('/')
//           // .set('Accept', 'application/json')
//           // .expect('Content-Type', /json/)
//           .expect(200, done);
//   });
// });

/**
* Testing get a user endpoint by giving an existing user
*/
// describe('GET /user/:id', function () {
//   it('respond with json containing a single user', function (done) {
//       request(index)
//           .get('/user/1')
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(200, done);
//   });
// });


// /**
// * Testing post user endpoint
// */
// describe('POST /admin/users', function () {
//   let data = {
//     "id": 40,
//     "first_name": "Aison",
//     "last_name": "Mendezs",
//     "email": "aisonmendez@google.com",
//     "password": "abcdefgh",
//     "age": 20,
//   }
//   it('respond with 201 created', function (done) {
//       request(app)
//           .post('/users')
//           .send(data)
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(201)
//           .end((err) => {
//               if (err) return done(err);
//               done();
//           });
//   });
// });


// describe('Unit testing the / route', function() {

//   it('should return OK status', function() {
//     return request(index)
//       .get('/')
//       .then(function(response){
//           assert.equal(response.status, 200)
//       })
//   });

// });



