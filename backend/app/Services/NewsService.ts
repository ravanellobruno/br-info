import axios from 'axios';
import cheerio from 'cheerio';

export default class ScienceTechNewsService {
  public static async getAll(path: string, limit: number) {
    const { data } = await axios(`https://g1.globo.com/${path}`);
    const $ = cheerio.load(data);

    const news: any[] = [];

    for (let index = 0; index < limit; index++) {
      const content = $('.feed-post').eq(index);

      news.push({
        href: content.find('.feed-post-link').attr('href'),
        image: content.find('.feed-post-figure-link').find('img').attr('src'),
        titulo: content.find('.feed-post-body-title').text(),
        intro: content.find('.feed-post-body-resumo').text(),
      });
    }

    return news;
  }
}
