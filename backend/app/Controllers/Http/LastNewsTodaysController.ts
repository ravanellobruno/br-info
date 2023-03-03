import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LastNewsTodaysService from 'App/Services/LastNewsTodaysService';

export default class LastNewsTodaysController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await LastNewsTodaysService.getAll();
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
