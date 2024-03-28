import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MySoccerTeamService from 'App/Services/MySoccerTeamService';

export default class MySoccerTeamController {
  public async index({ request, response }: HttpContextContract) {
    try {
      MySoccerTeamService.team = request.input('team');
      const data = await MySoccerTeamService.getAll();

      return response.status(200).send({ data });
    } catch (error) {
      console.log(error);
      return response.status(500).send({ error });
    }
  }
}
