import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HolidaysService from 'App/Services/HolidaysService';

export default class HolidaysController {
  public async index({ request, response }: HttpContextContract) {
    const { state, city } = request.all();

    try {
      const data = await HolidaysService.getAll(state, city);
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
