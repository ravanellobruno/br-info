import axios from 'axios';
const cheerio = require('cheerio');

export default class WeatherNowsService {
  public static async getAll(state = '', city = '') {
    const { data } = await axios(`https://tempo.clic.com.br/${state}/${city}`);
    const $ = cheerio.load(data);

    return {
      temperature: $('.mainInfo .temperature_now').text().trim(),
      todayMin: $('.week_day_anchor .minimumTemperature').eq(0).text(),
      todayMax: $('.week_day_anchor .maximumTemperature').eq(0).text(),
      todayCondition: $('.mainInfo .weatherCondition title').first().text(),
      tomorrowCondition: $('.week_day_anchor .weatherCondition title')
        .eq(1)
        .text(),
      tomorrowMin: $('.week_day_anchor .minimumTemperature').eq(1).text(),
      tomorrowMax: $('.week_day_anchor .maximumTemperature').eq(1).text(),
    };
  }
}
