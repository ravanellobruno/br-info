import axios from 'axios';
import cheerio from 'cheerio';
import ListHelper from 'App/Helpers/ListHelper';

export default class NewsService {
  private static async getAllByPath(path: string) {
    const { data } = await axios(`https://g1.globo.com/${path}`);
    const $ = cheerio.load(data);

    const news: object[] = [];
    let limit = 8;

    for (let i = 0; i < limit; i++) {
      const target = $('.feed-post').eq(i);
      const title = target.find('.feed-post-body-title').text();

      if (/assista a|vídeo:|vídeos:/.test(title.toLowerCase())) {
        limit++;
        continue;
      }

      news.push({
        href: target.find('.feed-post-link').attr('href'),
        img: target.find('.feed-post-figure-link').find('img').attr('src'),
        title,
        intro: target.find('.feed-post-body-resumo').text(),
      });
    }

    return news;
  }

  public static async getAll(type: string, params: any = null) {
    switch (type) {
      case 'lastNews':
        const brNews = await this.getAllByPath('ultimas-noticias');

        const { ufValue, ufName } = params;
        const ufPath = `${ufValue}/${ufName}/ultimas-noticias`;
        const ufNews = await this.getAllByPath(ufPath);

        return ListHelper.mixedList(brNews, ufNews);
      case 'scienceTech':
        const tech = await this.getAllByPath('tecnologia');
        const science = await this.getAllByPath('ciencia');

        return ListHelper.mixedList(tech, science);
    }
  }
}
