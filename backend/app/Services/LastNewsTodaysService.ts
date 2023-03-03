import axios from 'axios';
const cheerio = require('cheerio');

export default class LastNewsTodaysService {
  public static async getAll() {
    const baseUrl = 'https://agenciabrasil.ebc.com.br/';

    const { data } = await axios(`${baseUrl}ultimas`);
    const $ = cheerio.load(data);

    const lastNews: any[] = [];

    for (let index = 0; index < 10; index++) {
      lastNews.push({
        href: baseUrl + $('.post-item').eq(index).find('a').eq(1).attr('href'),
        image: $('.view-ultimas .row .row')
          .eq(index)
          .find('.img-cover')
          .attr('data-echo'),
        titulo: $('.post-item h4').eq(index).text().trim(),
        intro: $('.post-item .text-secondary').eq(index).text().trim(),
      });
    }

    return lastNews;
  }
}
