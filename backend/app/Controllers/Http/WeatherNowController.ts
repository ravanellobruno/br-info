import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import WeatherNowService from 'App/Services/WeatherNowService';

export default class WeatherNowController {
  public async index({ request, response }: HttpContextContract) {
    const { uf, city } = request.all();

    try {
      const data = await WeatherNowService.getAll(uf, city);
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
