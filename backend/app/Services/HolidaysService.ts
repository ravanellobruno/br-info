import axios from 'axios';
import cheerio from 'cheerio';

export default class HolidaysService {
  public static async getAll(uf: string, city: string) {
    const { data } = await axios(
      `https://www.transportal.com.br/feriados/${uf}/${city}/`
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

  private static getDayName(date: Date) {
    const weekDayNum = date.getDay();

    const weekDays = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];

    return weekDays[weekDayNum];
  }

  private static validateDate(holiday: string) {
    const splitedDate = holiday.substring(0, 10).split('/');

    const date = new Date(
      parseInt(splitedDate[2]),
      parseInt(splitedDate[1]) - 1,
      parseInt(splitedDate[0])
    );

    const todayDate = new Date();

    if (date < todayDate) {
      return;
    }

    const dayName = this.getDayName(date);
    const isToday = date === todayDate;

    return `${isToday ? 'HOJE - ' : ''} ${holiday} (${dayName})`;
  }
}
