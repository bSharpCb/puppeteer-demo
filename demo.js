import puppeteer from 'puppeteer';
import request_client from 'request-promise-native';

const sitesOutput = (async () => {
  const browser = await puppeteer.launch(
    {
      headless: true,
      args: ['--no-sandbox']
    });
  const page = await browser.newPage();
  const result = [];
  const assets = ['https://foxsports.com/'];
  await page.setRequestInterception(true);

  page.on('request', request => {
      request_client({
        uri: request.url(),
        resolveWithFullResponse: false,
      }).then(response => {
        const request_url = request.url();
        const request_headers = request.headers();
        if (request_url.indexOf('opecloud') > -1) {
          result.push({
            request_url,
            request_headers
          });
        }
        request.continue();
      }).catch(error => {
        //console.error(error);
        request.abort();
      });
  });

  await page.goto(assets[0], {
    waitUntil: 'networkidle0',
  })

  await page.screenshot({
    path: 'screenshot.jpg',
  });

  // const sendVisit = await page.evaluate(
  //   ope("foxus", "sendVisit", {
  //     "visitUrl": window.location.href
  //   })
  //   );


  await browser.close();
  return result;
})();

export default sitesOutput;