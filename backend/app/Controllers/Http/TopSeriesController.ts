import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import TopSeriesService from 'App/Services/TopSeriesService';

export default class TopSeriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await TopSeriesService.getAll();
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
