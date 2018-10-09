const cheerio = require('cheerio');
const axios = require('axios');

const getCurrencies = async () => {
  const url = `http://www.bna.com.ar/Personas#divisas`;
  const { data: html } = await axios(url);

  const $ = cheerio.load(html);
  let currencies = [];
  let argentina = [];
  $('tr', '#divisas').each((i, elm) => {
    argentina.push({
      currency: $(elm)
        .children()
        .first()
        .text(),
      buy: $(elm)
        .children()
        .eq(1)
        .first()
        .text(),
      sell: $(elm)
        .children()
        .eq(2)
        .first()
        .text(),
    });
  });
  argentina = argentina.reduce(
    (coin, currency) =>
      currency.currency.indexOf('Dolar U.S.A') ? coin : currency,
    argentina[0]
  );
  currencies.push(argentina);
  return currencies;
};

module.exports = {
  getCurrencies,
};
