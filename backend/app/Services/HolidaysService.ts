import axios from 'axios';
import cheerio from 'cheerio';

export default class HolidaysService {
  private static dayName(date: Date) {
    const dayNum = date.getDay();

    const week = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];

    return week[dayNum];
  }

  private static validateDate(holiday: string) {
    const splitedDate = holiday.substring(0, 10).split('/');

    const date = new Date(
      parseInt(splitedDate[2]),
      parseInt(splitedDate[1]) - 1,
      parseInt(splitedDate[0])
    );

    const today = new Date();

    if (date < today) {
      return;
    }

    const dayName = this.dayName(date);
    const isToday = date === today;

    return `${isToday ? 'HOJE - ' : ''} ${holiday} (${dayName})`;
  }

  public static async getAll(uf: string, city: string) {
    const { data } = await axios(`https://www.transportal.com.br/feriados/${uf}/${city}/`);
    const $ = cheerio.load(data);

    const validHolidays: string[] = [];

    $('.div-cinza .coluna-com-padding-direita h2').each(function () {
      const holiday = $(this).text().trim();
      const validHoliday = HolidaysService.validateDate(holiday);

      if (validHoliday) {
        const complement = $(this).next().text();
        validHolidays.push(`${validHoliday} (${complement})`);
      }
    });

    return validHolidays;
  }
}
