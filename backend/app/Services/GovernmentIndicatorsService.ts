import axios from 'axios';
import cheerio from 'cheerio';

export default class GovernmentIndicatorsService {
  public static async getAll() {
    const { data } = await axios('https://www.ibge.gov.br/indicadores');
    const $ = cheerio.load(data);
    const target = $('.indicador-container');

    return {
      ipca: {
        value: target.eq(0).find('p').eq(0).text(),
        date: target.eq(0).find('p').eq(1).text(),
      },
      inpc: {
        value: target.eq(1).find('p').eq(0).text(),
        date: target.eq(1).find('p').eq(1).text(),
      },
      pib: {
        value: target.eq(2).find('p').eq(0).text(),
        date: target.eq(2).find('p').eq(1).text(),
      },
      desemprego: {
        value: target.eq(3).find('p').eq(0).text(),
        date: target.eq(3).find('p').eq(1).text(),
      },
    };
  }
}
