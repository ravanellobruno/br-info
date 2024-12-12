import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GovernmentIndicatorsService from 'App/Services/GovernmentIndicatorsService';

export default class GovernmentIndicatorsController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await GovernmentIndicatorsService.getAll();
      return response.status(200).send({ data });
    } catch (err) {
      return response.status(500).send({ err });
    }
  }
}
