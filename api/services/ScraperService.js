const cheerio = require('cheerio');
const axios = require('axios');

const getCurrencies = async () => {
  // ARGENTINA
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

  // MEXICO
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
    buy: values[0],
    sell: values[1],
  });
  currencies.push(mexico[0]);

  // COLOMBIA
  const urlColombia =
    'https://www.indicadorescolombia.com/cambio-de-dolar-peso-colombiano-hoy.html';
  let { data: htmlcol } = await axios(urlColombia);
  $ = cheerio.load(htmlcol);
  let colombia = [];
  let colombiaValues = $('.valor').text();
  colombiaValues = colombiaValues.replace(' pesos colombianos', '');
  colombia.push({
    country: 'colombia',
    buy: colombiaValues,
    sell: colombiaValues,
  });
  console.log('COLOMBIA: ', colombia);
  currencies.push(colombia[0]);
  return currencies;
};

module.exports = {
  getCurrencies,
};
