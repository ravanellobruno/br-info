import axios from 'axios';
import cheerio from 'cheerio';
import ListHelper from 'App/Helpers/ListHelper';

export default class TopSeriesService {
  private static async getAllByPath(path: string) {
    const baseUrl = 'https://www.adorocinema.com/series-tv/';

    const { data } = await axios(baseUrl + path);
    const $ = cheerio.load(data);

    const series: object[] = [];

    for (let i = 0; i < 8; i++) {
      const imgTarget = $('.thumbnail').find('.thumbnail-img').eq(i);
      const img = imgTarget.attr('data-src') || imgTarget.attr('src');

      series.push({
        title: $('.meta-title').eq(i).text().replace(/\n/g, ' ').trim(),
        href: baseUrl + $('.meta-title-link').eq(i).attr('href'),
        info: $('.meta-body-info').eq(i).text().replace(/\n/g, ' ').trim(),
        cast: $('.meta-body-actor').eq(i).text().replace(/\n/g, ' ').trim(),
        synopsis: $('.synopsis').eq(i).text().replace(/\n/g, ' ').trim(),
        img,
      });
    }

    return series;
  }

  public static async getAll() {
    const top = await this.getAllByPath('top');
    const best = await this.getAllByPath('melhores');

    return ListHelper.mixedList(top, best);
  }
}
