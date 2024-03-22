import axios from 'axios';
import cheerio from 'cheerio';

export default class NewsService {
  public static async getAll(type: string, params: any = null) {
    switch (type) {
      case 'lastNews':
        const brNews = await NewsService.getAllByPath('ultimas-noticias', 8);

        const { ufValue, ufName } = params;
        const ufPath = `${ufValue}/${ufName}/ultimas-noticias`;
        const ufNews = await this.getAllByPath(ufPath, 8);

        return brNews.flatMap((el, index) => [el, ufNews[index]]);
      case 'scienceTech':
        const tech = await this.getAllByPath('tecnologia', 8);
        const science = await this.getAllByPath('ciencia', 8);

        return tech.flatMap((el, index) => [el, science[index]]);
    }
  }

  private static async getAllByPath(path: string, limit: number) {
    const { data } = await axios(`https://g1.globo.com/${path}`);
    const $ = cheerio.load(data);

    const news: any[] = [];

    for (let index = 0; index < limit; index++) {
      const target = $('.feed-post').eq(index);
      const title = target.find('.feed-post-body-title').text();

      if (/assista a|vídeo:/.test(title.toLowerCase())) {
        limit++;
        continue;
      }

      news.push({
        href: target.find('.feed-post-link').attr('href'),
        image: target.find('.feed-post-figure-link').find('img').attr('src'),
        title,
        intro: target.find('.feed-post-body-resumo').text(),
      });
    }

    return news;
  }
}
