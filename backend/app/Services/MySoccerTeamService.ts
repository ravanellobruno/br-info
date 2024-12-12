import axios from 'axios';
import cheerio from 'cheerio';

export default class MySoccerTeamService {
  public static team: string;

  private static async target(path: string) {
    const baseUrl = 'https://www.placardefutebol.com.br/time/';
    const { data } = await axios(baseUrl + this.team + path);
    const $ = cheerio.load(data);

    return $('.match__lg').eq(0);
  }

  private static getMatch(target: any) {
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
    const target = await this.target('/ultimos-jogos');
    const match = this.getMatch(target);

    return Object.assign(match, {
      score: target.find('.match__lg_card--scoreboard').text().trim(),
      date: target.find('.match__lg_card--date').text().trim(),
      live: target.find('.match__lg_card--live').text().trim(),
    });
  }

  private static async getNextMatch() {
    const target = await this.target('/proximos-jogos');
    const match = this.getMatch(target);

    return Object.assign(match, {
      date: target
        .find('.match__lg_card--datetime')
        .text()
        .trim()
        .replace(/(?=.{5}$)/, ' '),
    });
  }

  public static async getAll() {
    return {
      previous: await this.getPreviousMatch(),
      next: await this.getNextMatch(),
    };
  }
}
