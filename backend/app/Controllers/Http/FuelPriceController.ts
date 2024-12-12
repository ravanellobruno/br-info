import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FuelPriceService from 'App/Services/FuelPriceService';

export default class FuelPriceController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const data = await FuelPriceService.getAll(request.input('uf'));
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
