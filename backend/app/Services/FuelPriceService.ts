import axios from 'axios';
import cheerio from 'cheerio';

export default class FuelPriceService {
  public static async getAll(uf: string) {
    const baseUrls = {
      br: 'https://precos.petrobras.com.br/seleção-de-estados-',
      uf: 'https://precos.petrobras.com.br/w/',
    };

    const prices = {};

    const toGet = [
      { type: 'br', fuel: 'gas', url: `${baseUrls.br}gasolina` },
      { type: 'br', fuel: 'diesel', url: `${baseUrls.br}diesel` },
      { type: 'br', fuel: 'glp', url: `${baseUrls.br}glp` },
      { type: 'uf', fuel: 'gas', url: `${baseUrls.uf}gasolina/${uf}` },
      { type: 'uf', fuel: 'diesel', url: `${baseUrls.uf}diesel/${uf}` },
      { type: 'uf', fuel: 'glp', url: `${baseUrls.uf}glp/${uf}` },
    ];

    await Promise.all(
      toGet.map(async (el) => {
        const { data } = await axios(el.url);
        const $ = cheerio.load(data);

        prices[el.type] = prices[el.type] || {};
        prices[el.type][el.fuel] = $('.tabela-final').find('.real-value').eq(0).text().trim();
      })
    );

    return prices;
  }
}
