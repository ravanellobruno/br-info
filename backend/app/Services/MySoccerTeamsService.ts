import axios from 'axios';
import cheerio from 'cheerio';

export default class MySoccerTeamsService {
  public static team: string;
  private static baseUrl = 'https://www.placardefutebol.com.br/time/';

  public static async getAll() {
    return {
      previousMatch: await this.getPreviousMatch(),
      nextMatch: await this.getNextMatch(),
    };
  }

  private static async getPreviousMatch() {
    const { data } = await axios(`${this.baseUrl}${this.team}/ultimos-jogos`);
    const $ = cheerio.load(data);
    const target = $('.match__lg').eq(0);

    return {
      competition: target.find('.match__lg_card--league').text(),
      team1: {
        name: target.find('.match__lg_card--ht-name').text(),
        logo: target.find('.match__lg_card--ht-logo img').attr('src'),
      },
      team2: {
        name: target.find('.match__lg_card--at-name').text(),
        logo: target.find('.match__lg_card--at-logo img').attr('src'),
      },
      score: target.find('.match__lg_card--scoreboard').text().trim(),
      date: target.find('.match__lg_card--date').text().trim(),
      live: target.find('.match__lg_card--live').text().trim(),
    };
  }

  private static async getNextMatch() {
    const { data } = await axios(`${this.baseUrl}${this.team}/proximos-jogos`);
    const $ = cheerio.load(data);
    const target = $('.match__lg').eq(0);

    return {
      competition: target.find('.match__lg_card--league').text(),
      team1: {
        name: target.find('.match__lg_card--ht-name').text(),
        logo: target.find('.match__lg_card--ht-logo img').attr('src'),
      },
      team2: {
        name: target.find('.match__lg_card--at-name').text(),
        logo: target.find('.match__lg_card--at-logo img').attr('src'),
      },
      date: target
        .find('.match__lg_card--datetime')
        .text()
        .trim()
        .replace(/(?=.{5}$)/, ' '),
    };
  }
}
