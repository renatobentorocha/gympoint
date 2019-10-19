import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Mail from '../../lib/Mail';

class GymHelpOrderController {
  async index(req, res) {
    const help_order = await HelpOrder.findAll({
      where: { answer_at: null },
      include: [{ model: Student, as: 'student' }],
    });

    return res.json(help_order);
  }

  async store(req, res) {
    const { help_orders_id } = req.params;

    const help_order = await HelpOrder.findByPk(help_orders_id, {
      include: [{ model: Student, as: 'student' }],
    });

    if (!help_order) {
      return res.status(400).json({ error: 'Help order not found. ' });
    }

    const { answer } = req.body;

    help_order.answer = answer;
    help_order.answer_at = new Date();

    await help_order.save();

    await Mail.sendmail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: 'Reposta à sua dúvida',
      template: 'help_order',
      context: {
        student: help_order.student.name,
        answer,
        answer_at: format(
          help_order.answer_at,
          "'dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      },
    });

    return res.json(help_order);
  }
}

module.exports = new GymHelpOrderController();
