process.env.NODE_ENV = 'development'

const puppeteer = require('puppeteer');


('Should log admin in and log out', async () => {
  try{
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100
  });
  const page = await browser.newPage()
  await page.goto('http://localhost:3000')
  await page.click('.navbar-toggler');
  await page.click('.userLogin');
  await page.click('#tab1');
  await page.click('#tab1');
  await page.type('#email', 'test@test.com');
  await page.click('#password');
  await page.type('#password', 'test');
  await page.click(".userLogsin");
  await page.hover('.container');
  await page.click('.updateInfo');
  await page.click('.updateInfo');
//   await page.click('.done');
  await page.click('.navbar-toggler');
  await page.click('.logout')
  await browser.close();
}catch{
  return reject(e);
}
})()
