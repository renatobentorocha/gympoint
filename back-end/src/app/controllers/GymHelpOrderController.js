import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import paginate from '../util/paginate';
import Queue from '../../lib/Queue';
import AnswerHelpOrder from '../jobs/AnswerHelpOrder';

class GymHelpOrderController {
  async index(req, res) {
    const { page = 1, page_size = 5 } = req.query;

    const help_orders = await HelpOrder.findAll(
      paginate(
        {
          where: { answer_at: null },
          include: [{ model: Student, as: 'student' }],
        },
        { page, page_size }
      )
    );

    const total = await HelpOrder.count({ where: { answer_at: null } });

    return res.json({
      help_orders,
      total,
      page,
      page_count: Math.ceil(
        total / (Number(page_size) > 0 ? Number(page_size) : 5)
      ),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const help_order = await HelpOrder.findOne({
      where: { id },
      include: [{ model: Student, as: 'student' }],
    });

    if (!help_order) {
      return res.status(400).json({ error: 'Help order not found. ' });
    }

    return res.status(200).json(help_order);
  }

  async store(req, res) {
    const { id } = req.params;

    const help_order = await HelpOrder.findByPk(id, {
      include: [{ model: Student, as: 'student' }],
    });

    if (!help_order) {
      return res.status(400).json({ error: 'Help order not found. ' });
    }

    const { answer } = req.body;

    help_order.answer = answer;
    help_order.answer_at = new Date();

    await help_order.save();

    Queue.add(AnswerHelpOrder.key, { help_order, answer });

    return res.json(help_order);
  }
}

module.exports = new GymHelpOrderController();
