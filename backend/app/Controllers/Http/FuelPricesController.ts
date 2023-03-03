import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FuelPricesService from 'App/Services/FuelPricesService';

export default class FuelPricesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const data = await FuelPricesService.getAll(request.input('uf'));
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
