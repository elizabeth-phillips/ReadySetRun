process.env.NODE_ENV = 'development'

const puppeteer = require('puppeteer');


('Should browse through without log in ', async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100
        });
        const page = await browser.newPage()
        await page.goto('http://localhost:3000')
        await page.click('.navbar-toggler');
        await page.click('.races');
        await page.select('select[name="selectpicker"]', 'CO');
        await page.click('.searchRace');
        await page.hover('.row');
        await page.click('.navbar-toggler');
        await page.click('.runningGroup');
        await page.select('select[name="selectpicker"]', 'Florida');
        await page.click('.searchGroup');
        await browser.close()
    } catch (e) {
        return reject(e);
    }
})()