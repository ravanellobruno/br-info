import axios from 'axios';
import cheerio from 'cheerio';

export default class WeatherNowService {
  public static async getAll(uf: string, city: string) {
    const { data } = await axios(`https://tempo.clic.com.br/${uf}/${city}`);
    const $ = cheerio.load(data);

    return {
      temperature: $('.mainInfo .temperature_now').text().trim(),
      min: $('.week_day_anchor .minimumTemperature').eq(0).text(),
      max: $('.week_day_anchor .maximumTemperature').eq(0).text(),
      condition: $('.mainInfo .weatherCondition title').first().text(),
      tomorrow: {
        condition: $('.week_day_anchor .weatherCondition title').eq(1).text(),
        min: $('.week_day_anchor .minimumTemperature').eq(1).text(),
        max: $('.week_day_anchor .maximumTemperature').eq(1).text(),
      },
    };
  }
}
