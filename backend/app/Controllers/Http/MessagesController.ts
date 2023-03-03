import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import SendMessageValidator from 'App/Validators/SendMessageValidator';

export default class MessagesController {
  public async send({ request, response }: HttpContextContract) {
    const data = await request.validate(SendMessageValidator);

    try {
      await Mail.send((message) => {
        message
          .from(Env.get('EMAIL_FROM'))
          .to(Env.get('EMAIL_TO'))
          .subject('Contato - BR Info')
          .htmlView('emails/contact', data);
      });

      return response
        .status(200)
        .send({ message: 'Mensagem enviada com sucesso' });
    } catch (error) {
      return response.status(500).send({
        message:
          'Não foi possível enviar a mensagem. Tente novamente mais tarde',
      });
    }
  }
}
