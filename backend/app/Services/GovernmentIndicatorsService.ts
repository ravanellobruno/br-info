import axios from 'axios';
const cheerio = require('cheerio');

export default class GovernmentIndicatorsService {
  public static async getAll() {
    const { data } = await axios('https://www.ibge.gov.br/indicadores.html');
    const $ = cheerio.load(data);
    const content = $('.indicador-container');

    return {
      ipca: {
        value: content.eq(0).find('p').eq(0).text(),
        date: content.eq(0).find('p').eq(1).text(),
      },
      inpc: {
        value: content.eq(1).find('p').eq(0).text(),
        date: content.eq(1).find('p').eq(1).text(),
      },
      pib: {
        value: content.eq(2).find('p').eq(0).text(),
        date: content.eq(2).find('p').eq(1).text(),
      },
      desemprego: {
        value: content.eq(3).find('p').eq(0).text(),
        date: content.eq(3).find('p').eq(1).text(),
      },
    };
  }
}
