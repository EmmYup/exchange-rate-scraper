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
    currency: 'Dolar U.S.A',
    buy: values[0],
    sell: values[1],
  });
  currencies.push(mexico[0]);

  // COLOMBIA
  const urlColombia =
    'http://obieebr.banrep.gov.co/analytics/saw.dll?Go&path=%2Fshared%2fSeries%20Estad%C3%ADsticas_T%2F1.%20Tasa%20de%20Cambio%20Peso%20Colombiano%2F1.1%20TRM%20-%20Disponible%20desde%20el%2027%20de%20noviembre%20de%201991%2F1.1.6.TCM_TRM%20para%20un%20d%C3%ADa&lang=es&options=rdf&NQUser=publico&NQPassword=publico';
  let { data: htmlcol } = await axios(urlColombia);
  $ = cheerio.load(htmlcol);
  let colombia = [];
  console.log('COLOMBIA: ', $('#div_datos').find('b').length);

  return currencies;
};

module.exports = {
  getCurrencies,
};
