const puppeteer = require('puppeteer');

function createLaunchOptions() {
  let chromeArgs = process.env['CHROME_ARGS'];
  if (!chromeArgs) {
    return null;
  }
  return { args: chromeArgs.split(' ') };
}
module.exports = async function screenshotHourlyForecast(longitude, latitude) {
  longitude = encodeURIComponent(longitude);
  latitude = encodeURIComponent(latitude);
  const url = `https://weathernews.jp/onebox/${longitude}/${latitude}/temp=c&lang=ja`;

  const browser = await puppeteer.launch(createLaunchOptions());
  const page = await browser.newPage();
  await page.setViewport({width: 1000, height: 600, deviceScaleFactor: 1});
  await page.goto(url);

  await page.evaluate(() => {
    let moreElements = document.querySelectorAll('.fcst-table-hourly .tbl_more');
    for (let i = 0; i < Math.min(moreElements.length, 5); i++) {
      moreElements[i].style.display = '';
    }
  });

  const clip = await page.evaluate(() => {
    const element = document.querySelector('.fcst-table-hourly');
    const {x, y, width, height} = element.getBoundingClientRect();
    return {x, y, width, height};
  });

  const image = await page.screenshot({ clip });
  await page.close();
  await browser.close();
  return image;
};
