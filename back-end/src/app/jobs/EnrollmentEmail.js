import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentEmail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { student, plan, start_date, end_date, price } = data;

    await Mail.sendmail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      template: 'enrollment',
      context: {
        id: student.id,
        student: student.name,
        plan: plan.title,
        start_date: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        end_date: format(parseISO(end_date), "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price),
        logo: `${process.env.APP_URL}/files/logo.png`,
      },
    });
  }
}

export default new EnrollmentEmail();
