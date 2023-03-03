import axios from 'axios';
const cheerio = require('cheerio');

export default class HolidaysService {
  public static async getAll(state = '', city = '') {
    const { data } = await axios(
      `https://www.transportal.com.br/feriados/${state}/${city}/`
    );

    const $ = cheerio.load(data);

    const validHolidays: string[] = [];

    $('.div-cinza .coluna-com-padding-direita h2').each(function () {
      const holiday = $(this).text().trim();
      const validHoliday = HolidaysService.validateDate(holiday);

      if (validHoliday) {
        const holidayComplement = $(this).next().text();
        validHolidays.push(`${validHoliday} (${holidayComplement})`);
      }
    });

    return validHolidays;
  }

  private static validateDate(holiday) {
    const date = holiday.substr(0, holiday.indexOf('-')).trim();
    const splitedDate = date.split('/');

    let dateToVerify = new Date(
      splitedDate[2],
      splitedDate[1] - 1,
      splitedDate[0]
    );

    const todayDate = new Date();

    if (dateToVerify < todayDate) {
      return;
    }

    return (dateToVerify === todayDate ? 'HOJE - ' : '') + holiday;
  }
}
