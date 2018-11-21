const cheerio = require('cheerio');
const axios = require('axios');
const moment = require('moment');
const DOMParser = require('xmldom').DOMParser;

const generateCurrencies = async () => {
  console.log('HOLA');
  const names = ['mxn', 'col', 'real', 'rd', 'canada', 'euro', 'arp'];
  const currencies = await Currency.find();
  console.log(currencies.length);
  if (currencies.length > 0) {
    return;
  } else {
    names.map(async name => await Currency.create({ name, date: new Date() }));
  }
};

const getCurrencies = async () => {
  await generateCurrencies();

  // const currency = await Currency.create({
  //   name: 'mxn',
  //   date: new Date(),
  // });
  // const currency = await Currency.find();
  // return currency;
  // await generateCurrencies();
  // // ARGENTINA
  // const urlArgentina = `http://www.bna.com.ar/Personas#divisas`;
  // let { data: html } = await axios(urlArgentina);
  // let $ = cheerio.load(html);
  // let currencies = [];
  // let argentina = [];
  // $('tr', '#divisas').each((i, elm) => {
  //   argentina.push({
  //     country: 'argentina',
  //     currency: $(elm)
  //       .children()
  //       .first()
  //       .text(),
  //     buy: parseFloat(
  //       $(elm)
  //         .children()
  //         .eq(1)
  //         .first()
  //         .text()
  //     ),
  //     sell: parseFloat(
  //       $(elm)
  //         .children()
  //         .eq(2)
  //         .first()
  //         .text()
  //     ),
  //   });
  // });
  // argentina = argentina.reduce(
  //   (coin, currency) =>
  //     currency.currency.indexOf('Dolar U.S.A') ? coin : currency,
  //   argentina[0]
  // );
  // delete argentina.currency;
  // const { id: idARG } = await Currency.findOne({ name: 'arp' });
  // await ExchangeRate.create({
  //   buy: argentina.buy,
  //   sell: argentina.sell,
  //   country: argentina.country,
  //   Currency: idARG,
  // });
  // currencies.push(argentina);
  // // MEXICO
  // const date = moment(new Date()).format('DD/MM/YYYY');
  // const urlMexico = `http://www.banxico.org.mx/tipcamb/datosieajax?accion=dato&idSeries=SF43718&decimales=4&fecha=${date}`;
  // const mexico = [];
  // const { data: responsemx } = await axios(urlMexico);
  // mexico.push({
  //   country: 'mexico',
  //   buy: parseFloat(responsemx.body[0].mensaje),
  //   sell: parseFloat(responsemx.body[0].mensaje),
  // });
  // const { CurrencyID: idMX } = await Currency.findOne({ name: 'mxn' });
  // const exchangeRate = await ExchangeRate.create({
  //   buy: mexico[0].buy,
  //   sell: mexico[0].sell,
  //   country: mexico[0].country,
  //   date: new Date(),
  //   CurrencyID: idMX,
  // });
  // currencies.push(mexico[0]);
  // // COLOMBIA
  // const urlColombia =
  //   'https://www.indicadorescolombia.com/cambio-de-dolar-peso-colombiano-hoy.html';
  // let { data: htmlcol } = await axios(urlColombia);
  // $ = cheerio.load(htmlcol);
  // let colombia = [];
  // let colombiaValues = $('.valor').text();
  // colombiaValues = colombiaValues.replace(' pesos colombianos', '');
  // colombia.push({
  //   country: 'colombia',
  //   buy: parseFloat(colombiaValues),
  //   sell: parseFloat(colombiaValues),
  // });
  // const { id: idCOL } = await Currency.findOne({ name: 'col' });
  // await ExchangeRate.create({
  //   buy: colombia[0].buy,
  //   sell: colombia[0].sell,
  //   country: colombia[0].country,
  //   Currency: idCOL,
  // });
  // currencies.push(colombia[0]);
  // // CANADA
  // const urlCanada =
  //   'https://www.bankofcanada.ca/valet/observations/FXCADUSD/xml?recent=1';
  // const { data: responseCanada } = await axios(urlCanada);
  // const parser = new DOMParser();
  // const xmlDoc = parser.parseFromString(responseCanada, 'text/xml');
  // const dataCanada = xmlDoc.getElementsByTagName('v')[0].childNodes[0]
  //   .nodeValue;
  // const { id: idCANADA } = await Currency.findOne({ name: 'canada' });
  // await ExchangeRate.create({
  //   buy: parseFloat(dataCanada),
  //   sell: parseFloat(dataCanada),
  //   country: 'canada',
  //   Currency: idCANADA,
  // });
  // currencies.push({
  //   country: 'canada',
  //   buy: parseFloat(dataCanada),
  //   sell: parseFloat(dataCanada),
  // });
  // // EURO
  // const urlEuro =
  //   'https://www.bbva.es/sistema/meta/tarifas/cambiosdivisasbilletes.jsp?mb=si';
  // const { data: htmlEuro } = await axios(urlEuro);
  // $ = cheerio.load(htmlEuro);
  // let euro = [];
  // $('tr', '#tabla05colum').each((i, elm) => {
  //   let x = $(elm)
  //     .children('td')
  //     .text()
  //     .trim();
  //   if (x.indexOf('DOLAR USA') > -1) {
  //     euro.push({
  //       country: 'euro',
  //       buy: parseFloat(
  //         $(elm)
  //           .children()
  //           .eq(3)
  //           .first()
  //           .text()
  //           .replace(',', '.')
  //       ),
  //       sell: parseFloat(
  //         $(elm)
  //           .children()
  //           .eq(4)
  //           .first()
  //           .text()
  //           .replace(',', '.')
  //       ),
  //     });
  //   }
  // });
  // const { id: idEURO } = await Currency.findOne({ name: 'euro' });
  // await ExchangeRate.create({
  //   buy: euro[0].buy,
  //   sell: euro[0].sell,
  //   country: euro[0].country,
  //   Currency: idEURO,
  // });
  // currencies.push(euro[0]);
  // // REPUBLICA DOMINICANA
  // const urlRD =
  //   'https://www4.scotiabank.com/cgi-bin/ratesTool/depdisplay.cgi?pid=80';
  // const { data: htmlRD } = await axios(urlRD);
  // $ = cheerio.load(htmlRD);
  // let dominicRepublic = [];
  // $('tr', '#table892').each((i, elm) => {
  //   let x = $(elm)
  //     .children('td')
  //     .text()
  //     .trim();
  //   if (x.indexOf('Dólar') > -1) {
  //     dominicRepublic.push({
  //       country: 'dominica',
  //       buy: parseFloat(
  //         $(elm)
  //           .children()
  //           .eq(2)
  //           .first()
  //           .text()
  //       ),
  //       sell: parseFloat(
  //         $(elm)
  //           .children()
  //           .eq(3)
  //           .first()
  //           .text()
  //       ),
  //     });
  //   }
  // });
  // const { id: idRD } = await Currency.findOne({ name: 'rd' });
  // await ExchangeRate.create({
  //   buy: dominicRepublic[0].buy,
  //   sell: dominicRepublic[0].sell,
  //   country: dominicRepublic[0].country,
  //   Currency: idRD,
  // });
  // currencies.push(dominicRepublic[0]);
  // // BRAZIL
  // const urlBrazil =
  //   'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';
  // const { data: htmlBrz } = await axios(urlBrazil);
  // $ = cheerio.load(htmlBrz);
  // let brazil = [];
  // $('.fundoPadraoBClaro2').each((i, elm) => {
  //   let x = $(elm)
  //     .children('td')
  //     .eq(1)
  //     .first()
  //     .text()
  //     .trim();
  //   brazil.push({
  //     country: 'brazil',
  //     buy: parseFloat(
  //       $(elm)
  //         .children('td')
  //         .eq(1)
  //         .first()
  //         .text()
  //         .trim()
  //         .replace(',', '.')
  //     ),
  //     sell: parseFloat(
  //       $(elm)
  //         .children('td')
  //         .eq(2)
  //         .first()
  //         .text()
  //         .trim()
  //         .replace(',', '.')
  //     ),
  //   });
  // });
  // const { id: idREAL } = await Currency.findOne({ name: 'real' });
  // await ExchangeRate.create({
  //   buy: brazil[0].buy,
  //   sell: brazil[0].sell,
  //   country: brazil[0].country,
  //   Currency: idREAL,
  // });
  // currencies.push(brazil[0]);
  // return currencies;
};

const getSingle = async name => {
  let currencies = [];
  if (name === 'mexico') {
    const date = moment(new Date()).format('DD/MM/YYYY');
    const urlMexico = `http://www.banxico.org.mx/tipcamb/datosieajax?accion=dato&idSeries=SF43718&decimales=4&fecha=${date}`;
    const mexico = [];
    const { data: responsemx } = await axios(urlMexico);
    mexico.push({
      country: 'mexico',
      buy: parseFloat(responsemx.body[0].mensaje),
      sell: parseFloat(responsemx.body[0].mensaje),
    });
    const { CurrencyID: idMX } = await Currency.findOne({ name: 'mxn' });
    const exchangeRate = await ExchangeRate.create({
      buy: mexico[0].buy,
      sell: mexico[0].sell,
      country: mexico[0].country,
      date: new Date(),
      CurrencyID: idMX,
    });
    return exchangeRate;
  } else if (name === 'argentina') {
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
        buy: parseFloat(
          $(elm)
            .children()
            .eq(1)
            .first()
            .text()
        ),
        sell: parseFloat(
          $(elm)
            .children()
            .eq(2)
            .first()
            .text()
        ),
      });
    });
    argentina = argentina.reduce(
      (coin, currency) =>
        currency.currency.indexOf('Dolar U.S.A') ? coin : currency,
      argentina[0]
    );
    const { CurrencyID: idAR } = await Currency.findOne({ name: 'arp' });
    const exchangeRate = await ExchangeRate.create({
      buy: argentina.buy,
      sell: argentina.sell,
      country: argentina.country,
      date: new Date(),
      CurrencyID: idAR,
    });
    return exchangeRate;
  } else if (name === 'colombia') {
    const urlColombia =
      'https://www.indicadorescolombia.com/cambio-de-dolar-peso-colombiano-hoy.html';
    let { data: htmlcol } = await axios(urlColombia);
    let $ = cheerio.load(htmlcol);
    let colombia = [];
    let colombiaValues = $('.valor').text();
    colombiaValues = colombiaValues.replace(' pesos colombianos', '');
    colombia.push({
      country: 'colombia',
      buy: parseFloat(colombiaValues),
      sell: parseFloat(colombiaValues),
    });
    currencies.push(colombia[0]);
    return currencies;
  } else if (name === 'dominica') {
    const urlRD =
      'https://www4.scotiabank.com/cgi-bin/ratesTool/depdisplay.cgi?pid=80';
    const { data: htmlRD } = await axios(urlRD);
    let $ = cheerio.load(htmlRD);
    let dominicRepublic = [];
    $('tr', '#table892').each((i, elm) => {
      let x = $(elm)
        .children('td')
        .text()
        .trim();
      if (x.indexOf('Dólar') > -1) {
        dominicRepublic.push({
          country: 'dominica',
          buy: parseFloat(
            $(elm)
              .children()
              .eq(2)
              .first()
              .text()
          ),
          sell: parseFloat(
            $(elm)
              .children()
              .eq(3)
              .first()
              .text()
          ),
        });
      }
    });
    currencies.push(dominicRepublic[0]);
    return currencies;
  } else if (name === 'canada') {
    const urlCanada =
      'https://www.bankofcanada.ca/valet/observations/FXCADUSD/xml?recent=1';
    const { data: responseCanada } = await axios(urlCanada);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseCanada, 'text/xml');
    const dataCanada = xmlDoc.getElementsByTagName('v')[0].childNodes[0]
      .nodeValue;
    currencies.push({
      country: 'canada',
      buy: parseFloat(dataCanada),
      sell: parseFloat(dataCanada),
    });
    return currencies;
  } else if (name === 'euro') {
    const urlEuro =
      'https://www.bbva.es/sistema/meta/tarifas/cambiosdivisasbilletes.jsp?mb=si';
    const { data: htmlEuro } = await axios(urlEuro);
    let $ = cheerio.load(htmlEuro);
    let euro = [];
    $('tr', '#tabla05colum').each((i, elm) => {
      let x = $(elm)
        .children('td')
        .text()
        .trim();
      if (x.indexOf('DOLAR USA') > -1) {
        euro.push({
          country: 'euro',
          buy: parseFloat(
            $(elm)
              .children()
              .eq(3)
              .first()
              .text()
              .replace(',', '.')
          ),
          sell: parseFloat(
            $(elm)
              .children()
              .eq(4)
              .first()
              .text()
              .replace(',', '.')
          ),
        });
      }
    });
    currencies.push(euro[0]);
    return currencies;
  } else if (name === 'brazil') {
    const urlBrazil =
      'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';
    const { data: htmlBrz } = await axios(urlBrazil);
    let $ = cheerio.load(htmlBrz);
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
        buy: parseFloat(
          $(elm)
            .children('td')
            .eq(1)
            .first()
            .text()
            .trim()
            .replace(',', '.')
        ),
        sell: parseFloat(
          $(elm)
            .children('td')
            .eq(2)
            .first()
            .text()
            .trim()
            .replace(',', '.')
        ),
      });
    });
    currencies.push(brazil[0]);
    return currencies;
  }
};

module.exports = {
  getCurrencies,
  generateCurrencies,
  getSingle,
};
