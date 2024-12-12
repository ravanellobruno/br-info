import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import QuotationsTodayService from 'App/Services/QuotationsTodayService';

export default class QuotationsTodayController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await QuotationsTodayService.getAll();
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
