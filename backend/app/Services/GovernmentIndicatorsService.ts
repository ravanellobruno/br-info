import axios from 'axios';
const cheerio = require('cheerio');

export default class GovernmentIndicatorsService {
  public static async getAll() {
    const { data } = await axios('https://www.ibge.gov.br/indicadores.html');
    const $ = cheerio.load(data);
    const el = $('.indicador-container');

    return {
      ipca: {
        value: el.eq(0).find('p').eq(0).text(),
        date: el.eq(0).find('p').eq(1).text(),
      },
      inpc: {
        value: el.eq(1).find('p').eq(0).text(),
        date: el.eq(1).find('p').eq(1).text(),
      },
      pib: {
        value: el.eq(2).find('p').eq(0).text(),
        date: el.eq(2).find('p').eq(1).text(),
      },
      desemprego: {
        value: el.eq(3).find('p').eq(0).text(),
        date: el.eq(3).find('p').eq(1).text(),
      },
    };
  }
}
