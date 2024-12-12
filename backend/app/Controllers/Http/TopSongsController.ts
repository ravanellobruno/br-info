import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TopSongsService from 'App/Services/TopSongsService';

export default class TopSongsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await TopSongsService.getAll();
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
