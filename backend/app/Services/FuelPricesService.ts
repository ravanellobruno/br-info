import axios from 'axios';
const cheerio = require('cheerio');

export default class FuelPricesService {
  public static async getAll(uf = '') {
    const baseUrlBr = 'https://precos.petrobras.com.br/seleção-de-estados-';
    const baseUrlUf = 'https://precos.petrobras.com.br/w/';

    const averages = {};

    const toGet = [
      { type: 'br', fuel: 'gas', url: `${baseUrlBr}gasolina` },
      { type: 'br', fuel: 'diesel', url: `${baseUrlBr}diesel` },
      { type: 'br', fuel: 'glp', url: `${baseUrlBr}glp` },
      { type: 'uf', fuel: 'gas', url: `${baseUrlUf}gasolina/${uf}` },
      { type: 'uf', fuel: 'diesel', url: `${baseUrlUf}diesel/${uf}` },
      { type: 'uf', fuel: 'glp', url: `${baseUrlUf}glp/${uf}` },
    ];

    await Promise.all(
      toGet.map(async (element) => {
        const { data } = await axios(element.url);
        const $ = cheerio.load(data);

        averages[element.type] = averages[element.type] || {};

        averages[element.type][element.fuel] = $('.tabela-final')
          .find('.real-value')
          .eq(0)
          .text()
          .trim();
      })
    );

    return averages;
  }
}
