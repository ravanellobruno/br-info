import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NewsService from 'App/Services/NewsService';

export default class ScienceTechNewsController {
  public async index({ response }: HttpContextContract) {
    try {
      const tech = await NewsService.getAll('tecnologia', 5);
      const science = await NewsService.getAll('ciencia', 5);
      const data = tech.flatMap((el, index) => [el, science[index]]);

      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
