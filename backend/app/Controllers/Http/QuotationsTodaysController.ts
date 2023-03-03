import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import QuotationsTodaysService from 'App/Services/QuotationsTodaysService';

export default class QuotationsTodaysController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await QuotationsTodaysService.getAll();
      return response.status(200).send({ data });
    } catch (error) {
      return response.status(500);
    }
  }
}
