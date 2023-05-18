import axios from 'axios';
const cheerio = require('cheerio');

export default class FuelPricesService {
  public static async getAll(uf = '') {
    const baseUrls = {
      br: 'https://precos.petrobras.com.br/seleção-de-estados-',
      uf: 'https://precos.petrobras.com.br/w/',
    };

    const averages = {};

    const toGet = [
      { type: 'br', fuel: 'gas', url: `${baseUrls.br}gasolina` },
      { type: 'br', fuel: 'diesel', url: `${baseUrls.br}diesel` },
      { type: 'br', fuel: 'glp', url: `${baseUrls.br}glp` },
      { type: 'uf', fuel: 'gas', url: `${baseUrls.uf}gasolina/${uf}` },
      { type: 'uf', fuel: 'diesel', url: `${baseUrls.uf}diesel/${uf}` },
      { type: 'uf', fuel: 'glp', url: `${baseUrls.uf}glp/${uf}` },
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
