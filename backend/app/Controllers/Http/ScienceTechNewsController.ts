import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NewsService from 'App/Services/NewsService';

export default class ScienceTechNewsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await NewsService.getAll('scienceTech');
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500).send({ error });
    }
  }
}
