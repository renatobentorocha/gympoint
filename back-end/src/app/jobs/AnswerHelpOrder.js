import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerHelpOrder {
  get key() {
    return 'AnswerHelpOrder';
  }

  async handle({ data }) {
    const { help_order, answer } = data;

    await Mail.sendmail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Reposta à sua dúvida',
      template: 'help_order',
      context: {
        student: help_order.student.name,
        answer,
        answer_at: format(
          parseISO(help_order.answer_at),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        logo: `${process.env.APP_URL}/files/logo.png`,
      },
    });
  }
}

export default new AnswerHelpOrder();
