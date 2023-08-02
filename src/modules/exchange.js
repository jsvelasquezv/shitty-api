const { JSDOM } = require('jsdom');

async function getExchange() {
  const page = await fetch('https://www.google.com/finance/quote/USD-COP');
  const html = await page.text();

  const dom = new JSDOM(html);

  const elementHandleUSD =
    dom.window.document.querySelector('[data-source=USD]');
  const dolarCop = elementHandleUSD.getAttribute('data-last-price');

  const elementHandleEUR =
    dom.window.document.querySelector('[data-source=EUR]');
  const eurCop = elementHandleEUR.getAttribute('data-price');

  const elementHandleGBP =
    dom.window.document.querySelector('[data-source=GBP]');
  const gbpCop = elementHandleGBP.getAttribute('data-price');

  return {
    usd: dolarCop,
    eur: eurCop,
    gbp: gbpCop,
  };
}

module.exports = { getExchange };
