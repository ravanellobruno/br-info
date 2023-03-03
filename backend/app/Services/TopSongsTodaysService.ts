import axios from 'axios';
const cheerio = require('cheerio');

export default class TopSongsTodaysService {
  public static async getAll() {
    const { data } = await axios('https://www.letras.mus.br/playlists/910110');
    const $ = cheerio.load(data);
    const el = $('.cnt-list-songs li');

    const songs: object[] = [];

    for (let index = 0; index < 10; index++) {
      songs.push({
        song: el.find('.song-name').eq(index).text(),
        artist: el.find('.song-artist').eq(index).text(),
        href: `https://www.letras.mus.br${el
          .find('.bt-play-song')
          .eq(index)
          .attr('href')}`,
      });
    }

    return songs;
  }
}
