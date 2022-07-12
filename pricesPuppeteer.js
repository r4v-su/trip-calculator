const puppeteer = require('puppeteer');
(async () => {
   const browser = await puppeteer.launch()
   const page = await browser.newPage()
   await page.goto('https://paliwa.pl/monitoring-cen-paliw/wszystko-o-cenach').then()

const prices = {
  on: await page.$eval('#Ceny > div.mod_CenyHurtowePaliw.ceny-panel > div.kontener-text > table > tbody > tr:nth-child(2) > td:nth-child(3)', (el) => el.innerHTML.replace(',','.')),
  petrol95: await page.$eval('#Ceny > div.mod_CenyHurtowePaliw.ceny-panel > div.kontener-text > table > tbody > tr:nth-child(3) > td:nth-child(3)', (el) => el.innerHTML.replace(',','.')),
  lpg: await page.$eval('#Ceny > div.mod_CenyHurtowePaliw.ceny-panel > div.kontener-text > table > tbody > tr:nth-child(4) > td:nth-child(3)', (el) => el.innerHTML.replace(',','.'))
}

const fs = require('fs');
fs.writeFile("prices.json", JSON.stringify(prices), function(err) {
    if (err) {
        console.error(err);
    }
});
   await browser.close()
   console.log('\x1b[32msucces! data fetched from external website. Lookup for prices.json in project folder')
 })()