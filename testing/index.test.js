// const request = require('supertest');
const sum = require('../routes/sum');


test('adds 1+2 to equal 3', ()=>{
    expect(sum(1,2)).toBe(3);
});

// describe('Test the rooth path', () =>{
//     TextTrackList('It should response the GET method', (done)=>{
//         request(app).get('/').then((response)=>{
//             expect(response.statusCode).toBe(200);
//             done();
//         });
//     });
// });
