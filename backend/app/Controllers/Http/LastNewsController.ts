import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NewsService from 'App/Services/NewsService';

export default class LastNewsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const data = await NewsService.getAll('lastNews', request.all());
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500).send({ error });
    }
  }
}
