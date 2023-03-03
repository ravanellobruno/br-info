import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import WeatherNowsService from 'App/Services/WeatherNowsService';

export default class WeatherNowsController {
  public async index({ request, response }: HttpContextContract) {
    const { state, city } = request.all();

    try {
      const data = await WeatherNowsService.getAll(state, city);
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
