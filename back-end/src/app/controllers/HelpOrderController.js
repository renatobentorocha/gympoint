import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async index(req, res) {
    const help_order = await HelpOrder.findAll({
      where: { student_id: req.params.student_id },
      include: [{ model: Student, as: 'student' }],
    });

    return res.json(help_order);
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
