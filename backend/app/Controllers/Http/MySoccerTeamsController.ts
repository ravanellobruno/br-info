import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MySoccerTeamsService from 'App/Services/MySoccerTeamsService';

export default class MySoccerTeamsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      MySoccerTeamsService.team = request.input('team');
      const data = await MySoccerTeamsService.getAll();

      return response.status(200).send({ data });
    } catch (error) {
      console.log(error);
      return response.status(500).send({ error });
    }
  }
}
