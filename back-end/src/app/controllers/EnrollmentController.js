import * as Yup from 'yup';
import addMonths from 'date-fns/addMonths';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      include: [{ model: Plan, as: 'plan' }, { model: Student, as: 'student' }],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Enrollment.findOne({ where: { id } });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found. ' });
    }

    const startDateParsed = parseISO(start_date);
    const end_date = addMonths(startDateParsed, plan.duration);

    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date: startDateParsed,
      end_date,
      price,
    });

    await Mail.sendmail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula realizada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        start_date: format(startDateParsed, "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        end_date: format(end_date, "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      },
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date().when('plan_id', (plan_id, field) =>
        plan_id ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (student_id && !student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (plan_id && !plan) {
      return res.status(400).json({ error: 'Plan not found. ' });
    }

    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [{ model: Plan, as: 'plan' }],
    });

    if (plan) {
      enrollment.plan_id = plan.id;
      enrollment.start_date = parseISO(start_date);
      enrollment.end_date = addMonths(parseISO(start_date), plan.duration);
      enrollment.price = plan.duration * plan.price;
    }

    if (!plan && start_date) {
      enrollment.start_date = parseISO(start_date);
      enrollment.end_date = addMonths(
        parseISO(start_date),
        enrollment.plan.duration
      );
    }

    if (student_id) {
      enrollment.student_id = student_id;
    }

    await enrollment.save();

    return res.json(await enrollment.reload());
  }

  async destroy(req, res) {
    try {
      const enrollment = await Enrollment.findByPk(req.params.id);

      if (!enrollment) {
        return res.status(400).json({ error: 'Enrollment not found. ' });
      }

      await enrollment.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new EnrollmentController();
