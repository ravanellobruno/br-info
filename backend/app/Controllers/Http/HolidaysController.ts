import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HolidaysService from 'App/Services/HolidaysService';

export default class HolidaysController {
  public async index({ request, response }: HttpContextContract) {
    const { uf, city } = request.all();

    try {
      const data = await HolidaysService.getAll(uf, city);
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
