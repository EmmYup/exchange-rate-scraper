const cheerio = require('cheerio');
const axios = require('axios');

const getCurrencies = async () => {
  const urlArgentina = `http://www.bna.com.ar/Personas#divisas`;
  let { data: html } = await axios(urlArgentina);
  let $ = cheerio.load(html);
  let currencies = [];
  let argentina = [];
  $('tr', '#divisas').each((i, elm) => {
    argentina.push({
      country: 'argentina',
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
  const urlMexico = 'https://bbv.infosel.com/bancomerindicators/indexV7.aspx';
  let { data: htmlmx } = await axios(urlMexico);
  $ = cheerio.load(htmlmx);
  let mexico = [];
  let values = [];
  $('.tbl-info-financiera tr').each((i, elm) => {
    var x = $(elm)
      .children('td')
      .text()
      .trim();
    if (x.indexOf('Dólar Compra') > -1) {
      values[0] = $(elm)
        .children('td')
        .next()
        .text()
        .trim();
    }
    if (x.indexOf('Dólar Venta') > -1) {
      values[1] = $(elm)
        .children('td')
        .next()
        .text()
        .trim();
    }
  });
  mexico.push({
    country: 'mexico',
    currency: 'Dolar U.S.A',
    buy: values[0],
    sell: values[1],
  });
  currencies.push(mexico[0]);
  return currencies;
};

module.exports = {
  getCurrencies,
};
