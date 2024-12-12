import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NewsService from 'App/Services/NewsService';

export default class ScienceTechController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await NewsService.getAll('scienceTech');
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
