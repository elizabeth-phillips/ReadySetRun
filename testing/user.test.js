process.env.NODE_ENV = 'development'
const request = require('supertest');
const app = require('../routes/user');


describe('Test the paths for Race', () => {
    test('Should be defined', () => {
        expect(create).toBeDefined();
        request(create)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('Should be defined', () => {
        // request(app.login);
        expect(login).toBeDefined();
        request(login)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('Should be defined', () => {
        // request(app.update);
        expect(update).toBeDefined();
        request(update)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('Should be defined', () => {
        // request(app.logout);
        expect(logout).toBeDefined();
        request(logout)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('Should be defined', () => {
        // request(app.deleteUser);
        expect(deleteUser).toBeDefined();
        request(deleteUser)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });

    test('Should be defined', () => {
        // request(app.findById);
        expect(findById).toBeDefined();
        request(findById)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});


// const puppeteer = require('puppeteer');
// const user = require('../routes/user');

// test('should click around', async ()=>{
//     const browser = await puppeteer.launch({
//         headless:false,
//         slowMo: 80,
//         args:['--window-size=920,720']
//     });
//     const page = await browser.newPage();
//     await page.goto('http://localhost:3000');
// }, 10000);