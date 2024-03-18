import axios from 'axios';
import cheerio from 'cheerio';

export default class QuotationsTodaysService {
  public static async getAll() {
    const quotations = {};

    const toGet = [
      { quotation: 'dollar', url: 'https://dolarhoje.com' },
      { quotation: 'euro', url: 'https://dolarhoje.com/euro-hoje' },
      { quotation: 'bitcoin', url: 'https://dolarhoje.com/bitcoin-hoje' },
    ];

    await Promise.all(
      toGet.map(async (el) => {
        const { data } = await axios(el.url);
        const $ = cheerio.load(data);
        quotations[el.quotation] = $('#nacional').val() || null;
      })
    );

    return quotations;
  }
}
