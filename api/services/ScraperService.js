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
  delete argentina.currency;
  currencies.push(argentina);

  // MEXICO
  const urlMexico = 'https://bbv.infosel.com/bancomerindicators/indexV7.aspx';
  let { data: htmlmx } = await axios(urlMexico);
  $ = cheerio.load(htmlmx);
  let mexico = [];
  let values = [];
  $('.tbl-info-financiera tr').each((i, elm) => {
    let x = $(elm)
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
  currencies.push(colombia[0]);

  // CANADA
  const urlCanada =
    'https://www.bankofcanada.ca/valet/observations/FXCADUSD/json?recent=1';
  const { data: responseCanada } = await axios(urlCanada);
  currencies.push({
    country: 'canada',
    buy: responseCanada.observations[0].FXCADUSD.v,
    sell: responseCanada.observations[0].FXCADUSD.v,
  });

  // EURO
  const urlEuro =
    'https://www.bbva.es/sistema/meta/tarifas/cambiosdivisasbilletes.jsp?mb=si';
  const { data: htmlEuro } = await axios(urlEuro);
  $ = cheerio.load(htmlEuro);
  let euro = [];
  $('tr', '#tabla05colum').each((i, elm) => {
    let x = $(elm)
      .children('td')
      .text()
      .trim();
    if (x.indexOf('DOLAR USA') > -1) {
      euro.push({
        country: 'euro',
        buy: $(elm)
          .children()
          .eq(3)
          .first()
          .text(),
        sell: $(elm)
          .children()
          .eq(4)
          .first()
          .text(),
      });
    }
  });
  currencies.push(euro[0]);

  // REPUBLICA DOMINICANA
  const urlRD =
    'https://www4.scotiabank.com/cgi-bin/ratesTool/depdisplay.cgi?pid=80';
  const { data: htmlRD } = await axios(urlRD);
  $ = cheerio.load(htmlRD);
  let dominicRepublic = [];
  $('tr', '#table892').each((i, elm) => {
    let x = $(elm)
      .children('td')
      .text()
      .trim();
    if (x.indexOf('Dólar') > -1) {
      dominicRepublic.push({
        country: 'dominica',
        buy: $(elm)
          .children()
          .eq(2)
          .first()
          .text(),
        sell: $(elm)
          .children()
          .eq(3)
          .first()
          .text(),
      });
    }
  });
  currencies.push(dominicRepublic[0]);

  // BRAZIL
  const urlBrazil =
    'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';
  const { data: htmlBrz } = await axios(urlBrazil);
  $ = cheerio.load(htmlBrz);
  let brazil = [];
  $('.fundoPadraoBClaro2').each((i, elm) => {
    let x = $(elm)
      .children('td')
      .eq(1)
      .first()
      .text()
      .trim();
    brazil.push({
      country: 'brazil',
      buy: $(elm)
        .children('td')
        .eq(1)
        .first()
        .text()
        .trim(),
      sell: $(elm)
        .children('td')
        .eq(2)
        .first()
        .text()
        .trim(),
    });
  });
  currencies.push(brazil[0]);
  return currencies;
};

module.exports = {
  getCurrencies,
};
