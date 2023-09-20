import axios from 'axios';
const cheerio = require('cheerio');

export default class TopSongsTodaysService {
  public static async getAll() {
    const baseUrl = 'https://www.letras.mus.br';

    const { data } = await axios(`${baseUrl}/playlists/910110`);
    const $ = cheerio.load(data);
    const el = $('.songList-table-content');

    const songs: object[] = [];

    for (let index = 0; index < 10; index++) {
      songs.push({
        song: el.find('.songList-table-songName').eq(index).text(),
        artist: el.find('.songList-table-songArtist').eq(index).text(),
        href: `${baseUrl}${$('.songList-table-playButton')
          .eq(index)
          .attr('href')}`,
      });
    }

    return songs;
  }
}
