import axios from 'axios';
import cheerio from 'cheerio';

export default class QuotationsTodayService {
  public static async getAll() {
    const baseUrl = 'https://dolarhoje.com/';
    const quotations = {};

    const toGet = [
      { quotation: 'dollar', url: baseUrl },
      { quotation: 'euro', url: `${baseUrl}euro-hoje` },
      { quotation: 'bitcoin', url: `${baseUrl}bitcoin-hoje` },
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
