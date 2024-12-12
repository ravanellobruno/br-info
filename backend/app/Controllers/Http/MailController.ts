import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import SendMailValidator from 'App/Validators/SendMailValidator';

export default class MailController {
  public async send({ request, response }: HttpContextContract) {
    const data = await request.validate(SendMailValidator);

    try {
      await Mail.send((msg) => {
        msg
          .from(Env.get('EMAIL_FROM'))
          .to(Env.get('EMAIL_TO'))
          .subject('Contato - BR Info')
          .htmlView('emails/contact', data);
      });

      return response.status(200).send({ msg: 'Mensagem enviada com sucesso' });
    } catch (err) {
      return response.status(500).send({
        msg: 'Não foi possível enviar a mensagem. Tente novamente mais tarde',
      });
    }
  }
}
