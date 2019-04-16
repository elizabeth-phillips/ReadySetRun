process.env.NODE_ENV = 'development'


const puppeteer = require('puppeteer');
const user = require('../routes/index');

test ('Should browse through', async()=>{
    const browser = await puppeteer.launch({
        headless:false, 
        slowMo: 10
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.click('.navbar-toggler');
    await page.click('.userLogin');
    await page.type('#email', 'test@test.com');
    await page.type("#password", 'test');
    await page.click(".userLogsin");
}, 50000);



// test('should click around', async ()=>{
//     const browser = await puppeteer.launch({
//         headless:false,
//         slowMo: 50,
//         args:['--window-size=1920,1080']
//     });
//     // const viewPort = {width:1280, height:960};
//     const page = await browser.newPage();
//     await page.goto('http://localhost:3000');
    
//     // const title = await page.title();
//     // console.log(title);
//     // // await page.click('#menuToggle');
//     // await page.waitForSelector('#menuToggle');
//     // await page.click(".race");
//     // await page.click("#tab1");
//     // await page.click("#email");
//     // await page.type('#email', 'test@test.com');
//     // await page.type("#password", 'test');
//     // await page.click(".user-login");

//     // console.log(await page.content());
// }, 50000);