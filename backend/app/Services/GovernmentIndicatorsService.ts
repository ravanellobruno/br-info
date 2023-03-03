import axios from 'axios';
const cheerio = require('cheerio');

export default class GovernmentIndicatorsService {
  public static async getAll() {
    const { data } = await axios('https://www.ibge.gov.br/indicadores.html');
    const $ = cheerio.load(data);
    const el = $('.indicador-container');

    return {
      inflacaoIPCAValue: el.eq(0).find('p').eq(0).text(),
      inflacaoIPCADate: el.eq(0).find('p').eq(1).text(),
      inflacaoINPCValue: el.eq(1).find('p').eq(0).text(),
      inflacaoINPCDate: el.eq(1).find('p').eq(1).text(),
      pibValue: el.eq(2).find('p').eq(0).text(),
      pibDate: el.eq(2).find('p').eq(1).text(),
      desempregoValue: el.eq(2).find('p').eq(0).text(),
      desempregoDate: el.eq(2).find('p').eq(1).text(),
    };
  }
}
