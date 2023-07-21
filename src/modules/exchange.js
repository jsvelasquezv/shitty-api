const { chromium } = require('playwright-chromium');
const { NODE_ENV } = process.env;

const chromiumConfig =
  NODE_ENV === 'production'
    ? {
        executablePath: '/usr/bin/chromium-browser',
        args: [
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-sandbox',
        ],
        chromiumSandbox: false,
      }
    : {};

async function getExchange() {
  const browser = await chromium.launch(chromiumConfig);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com/finance/quote/USD-COP');
  await page.waitForSelector('[data-source=USD]');
  const elementHandleUSD = await page.$('[data-source=USD]');
  const dolarCop = await elementHandleUSD.getAttribute('data-last-price');

  await page.waitForSelector('[data-source=EUR]');
  const elementHandleEUR = await page.$('[data-source=EUR]');
  const eurCop = await elementHandleEUR.getAttribute('data-price');

  await page.waitForSelector('[data-source=GBP]');
  const elementHandleGBP = await page.$('[data-source=GBP]');
  const gbpCop = await elementHandleGBP.getAttribute('data-price');

  await browser.close();

  return {
    usd: dolarCop,
    eur: eurCop,
    gbp: gbpCop,
  };
}

module.exports = { getExchange };
