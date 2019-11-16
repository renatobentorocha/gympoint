import * as Yup from 'yup';
import addMonths from 'date-fns/addMonths';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';
import paginate from '../util/paginate';

class EnrollmentController {
  async index(req, res) {
    const { page = 1, page_size = 5 } = req.query;

    const enrollments = await Enrollment.findAll(
      paginate(
        {
          include: [
            { model: Plan, as: 'plan' },
            { model: Student, as: 'student' },
          ],
        },
        { page, page_size }
      )
    );

    const total = await Enrollment.count();

    return res.json({
      enrollments,
      total,
      page,
      page_count: Math.ceil(
        total / (Number(page_size) > 0 ? Number(page_size) : 5)
      ),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      include: [{ model: Plan, as: 'plan' }, { model: Student, as: 'student' }],
      where: { id },
    });

    return res.json(enrollment);
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

    const { student_id, plan_id, start_date, end_date, price } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found. ' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found. ' });
    }

    await Enrollment.create({
      student_id,
      plan_id,
      start_date,
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
      },
    });

    return res.status(200).json({
      id: plan_id,
      student,
      plan,
      start_date,
      end_date,
      active: true,
    });
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

    const enrollmentUpdated = await Enrollment.findOne({
      include: [{ model: Plan, as: 'plan' }, { model: Student, as: 'student' }],
      where: { id },
    });

    return res.json(enrollmentUpdated);
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
