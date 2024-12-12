import axios from 'axios';
import cheerio from 'cheerio';

export default class TopSongsService {
  public static async getAll() {
    const baseUrl = 'https://www.letras.mus.br';

    const { data } = await axios(`${baseUrl}/playlists/910110`);
    const $ = cheerio.load(data);
    const target = $('.songList-table-content');

    const songs: object[] = [];

    for (let i = 0; i < 10; i++) {
      songs.push({
        song: target.find('.songList-table-songName').eq(i).text(),
        artist: target.find('.songList-table-songArtist').eq(i).text(),
        href: `${baseUrl}${$('.songList-table-playButton').eq(i).attr('href')}`,
      });
    }

    return songs;
  }
}
