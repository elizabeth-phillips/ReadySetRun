const request = require('supertest');
const app = require('../routes/user');

describe('Test the paths for Race', () => {
    test('It should response the GET / method', () => {
        request(app).create().expect(200);
    });

    test('It should response the GET /:id', () => {
        request(app).update().expect(200);
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