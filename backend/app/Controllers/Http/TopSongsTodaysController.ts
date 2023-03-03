import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TopSongsTodaysService from 'App/Services/TopSongsTodaysService';

export default class TopSongsTodays {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await TopSongsTodaysService.getAll();
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
