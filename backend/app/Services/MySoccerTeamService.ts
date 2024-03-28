import axios from 'axios';
import cheerio from 'cheerio';

export default class MySoccerTeamService {
  public static team: string;

  public static async getAll() {
    return {
      previousMatch: await this.getPreviousMatch(),
      nextMatch: await this.getNextMatch(),
    };
  }

  private static async getTarget(path: string) {
    const baseUrl = 'https://www.placardefutebol.com.br/time/';
    const { data } = await axios(baseUrl + this.team + path);
    const $ = cheerio.load(data);

    return $('.match__lg').eq(0);
  }

  private static getCommonMatchData(target: any) {
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
    };
  }

  private static async getPreviousMatch() {
    const target = await this.getTarget('/ultimos-jogos');
    const match = this.getCommonMatchData(target);

    return Object.assign(match, {
      score: target.find('.match__lg_card--scoreboard').text().trim(),
      date: target.find('.match__lg_card--date').text().trim(),
      live: target.find('.match__lg_card--live').text().trim(),
    });
  }

  private static async getNextMatch() {
    const target = await this.getTarget('/proximos-jogos');
    const match = this.getCommonMatchData(target);

    return Object.assign(match, {
      date: target
        .find('.match__lg_card--datetime')
        .text()
        .trim()
        .replace(/(?=.{5}$)/, ' '),
    });
  }
}
