import axios from 'axios';
import cheerio from 'cheerio';
import ListHelper from 'App/Helpers/ListHelper';

export default class TopSeriesService {
  public static async getAll() {
    const top = await this.getAllByPath();
    const pop = await this.getAllByPath('populares');

    return ListHelper.mixLists(top, pop);
  }

  private static async getAllByPath(path: string = '') {
    const baseUrl = 'https://www.adorocinema.com/series-tv/top/';

    const { data } = await axios(baseUrl + path);
    const $ = cheerio.load(data);

    const series: object[] = [];

    for (let index = 0; index < 8; index++) {
      const imgTarget = $('.thumbnail').find('.thumbnail-img').eq(index);
      const img = imgTarget.attr('data-src') || imgTarget.attr('src');

      series.push({
        title: $('.meta-title').eq(index).text().replace(/\n/g, ' ').trim(),
        href: baseUrl + $('.meta-title-link').eq(index).attr('href'),
        info: $('.meta-body-info').eq(index).text().replace(/\n/g, ' ').trim(),
        cast: $('.meta-body-actor').eq(index).text().replace(/\n/g, ' ').trim(),
        synopsis: $('.synopsis').eq(index).text().replace(/\n/g, ' ').trim(),
        img,
      });
    }

    return series;
  }
}
