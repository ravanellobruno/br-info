import axios from 'axios';
const cheerio = require('cheerio');

export default class FuelPricesService {
  public static async getAll(uf = '') {
    const baseUrlBr = 'https://precos.petrobras.com.br/seleção-de-estados-';
    const baseUrlUf = 'https://precos.petrobras.com.br/w/';

    const averages = {};

    const toGet = [
      { fuel: 'gasBr', url: `${baseUrlBr}gasolina` },
      { fuel: 'dieselBr', url: `${baseUrlBr}diesel` },
      { fuel: 'glpBr', url: `${baseUrlBr}glp` },
      { fuel: 'gasUf', url: `${baseUrlUf}gasolina/${uf}` },
      { fuel: 'dieselUf', url: `${baseUrlUf}diesel/${uf}` },
      { fuel: 'glpUf', url: `${baseUrlUf}glp/${uf}` },
    ];

    await Promise.all(
      toGet.map(async (element) => {
        const { data } = await axios(element.url);
        const $ = cheerio.load(data);

        averages[element.fuel] = $('.tabela-final')
          .find('h1')
          .eq(0)
          .text()
          .trim();
      })
    );

    return averages;
  }
}
