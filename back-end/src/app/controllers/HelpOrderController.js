import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import paginate from '../util/paginate';

class HelpOrderController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json('Student not found');
    }

    const { page = 1, page_size = 5 } = req.query;

    const help_order = await HelpOrder.findAll(
      paginate(
        {
          where: { student_id },
          include: [{ model: Student, as: 'student' }],
        },
        { page, page_size }
      )
    );

    return res.status(200).json(help_order);
  }

  async show(req, res) {
    const { student_id, id } = req.params;

    const help_order = await HelpOrder.findOne({
      where: { student_id, id },
      include: [{ model: Student, as: 'student' }],
    });

    if (help_order) {
      return res.status(200).json(help_order);
    }

    return res.status(400).json('Student or Help order not found.');
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const { question } = req.body;

    const help_order = await HelpOrder.create({ student_id, question });

    return res.json(help_order);
  }
}

module.exports = new HelpOrderController();
