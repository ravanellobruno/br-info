import axios from 'axios';
const cheerio = require('cheerio');

export default class QuotationsTodaysService {
  public static async getAll() {
    const quotations = {};

    const toGet = [
      { quotation: 'dollar', url: 'https://dolarhoje.com' },
      { quotation: 'euro', url: 'https://dolarhoje.com/euro-hoje' },
      { quotation: 'bitcoin', url: 'https://dolarhoje.com/bitcoin-hoje' },
    ];

    await Promise.all(
      toGet.map(async (element) => {
        const { data } = await axios(element.url);
        const $ = cheerio.load(data);
        quotations[element.quotation] = $('#nacional').val() || null;
      })
    );

    return quotations;
  }
}
