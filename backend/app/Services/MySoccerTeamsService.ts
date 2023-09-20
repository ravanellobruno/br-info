import axios from 'axios';
const cheerio = require('cheerio');

export default class MySoccerTeamsService {
  private static team = '';
  private static baseUrl = 'https://www.placardefutebol.com.br/time/';

  public static async getAll(team) {
    this.team = team;

    return {
      previousMatch: await this.getPreviousMatch(),
      nextMatch: await this.getNextMatch(),
    };
  }

  private static async getPreviousMatch() {
    const { data } = await axios(`${this.baseUrl}${this.team}/ultimos-jogos`);
    let $ = cheerio.load(data);
    let el = $('.match__lg').eq(0);

    return {
      competition: el.find('.match__lg_card--league').text(),
      team1: {
        name: el.find('.match__lg_card--ht-name').text(),
        logo: el.find('.match__lg_card--ht-logo img').attr('src'),
      },
      team2: {
        name: el.find('.match__lg_card--at-name').text(),
        logo: el.find('.match__lg_card--at-logo img').attr('src'),
      },
      score: el.find('.match__lg_card--scoreboard').text().trim(),
      date: el.find('.match__lg_card--date').text().trim(),
      live: el.find('.match__lg_card--live').text().trim(),
    };
  }

  private static async getNextMatch() {
    const { data } = await axios(`${this.baseUrl}${this.team}/proximos-jogos`);
    let $ = cheerio.load(data);
    let el = $('.match__lg').eq(0);

    return {
      competition: el.find('.match__lg_card--league').text(),
      team1: {
        name: el.find('.match__lg_card--ht-name').text(),
        logo: el.find('.match__lg_card--ht-logo img').attr('src'),
      },
      team2: {
        name: el.find('.match__lg_card--at-name').text(),
        logo: el.find('.match__lg_card--at-logo img').attr('src'),
      },
      date: el
        .find('.match__lg_card--datetime')
        .text()
        .trim()
        .replace(/(?=.{5}$)/, ' '),
    };
  }
}
