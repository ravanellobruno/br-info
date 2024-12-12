import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class SendMailValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.maxLength(80)]),
    email: schema.string({}, [rules.email(), rules.maxLength(255)]),
    body: schema.string({}, [rules.maxLength(1000)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    required: 'O campo {{ field }} é obrigatório',
    minLength: 'Número de caracteres do campo {{ field }} é menor que o permitido',
    maxLength: 'Número de caracteres do campo {{ field }} é maior que o permitido',
    email: 'O e-mail informado é inválido',
  };
}
