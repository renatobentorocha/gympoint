import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.student_id },
      include: [{ model: Student, as: 'student' }],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.params;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

module.exports = new CheckinController();
