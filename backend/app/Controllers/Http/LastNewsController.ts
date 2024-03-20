import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import NewsService from 'App/Services/NewsService';

export default class LastNewsController {
  public async index({ request, response }: HttpContextContract) {
    const { ufValue, ufName } = request.all();

    try {
      const brNews = await NewsService.getAll('ultimas-noticias', 5);

      const ufPath = `${ufValue}/${ufName}/ultimas-noticias`;
      const ufNews = await NewsService.getAll(ufPath, 5);

      const data = brNews.flatMap((el, index) => [el, ufNews[index]]);

      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
