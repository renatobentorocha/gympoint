import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import paginate from '../util/paginate';

class StudentController {
  async index(req, res) {
    const { q, page = 1, page_size = 5 } = req.query;

    let query = null;

    if (q) {
      query = paginate(
        {
          where: {
            name: { [Op.iLike]: `%${q}%` },
          },
          include: [
            {
              model: Enrollment,
              as: 'enrollment',
              attributes: ['start_date', 'end_date', 'price', 'active'],
            },
          ],
        },
        { page, page_size }
      );
    } else {
      query = paginate(
        {
          include: [
            {
              model: Enrollment,
              as: 'enrollment',
              attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
              include: [{ model: Plan, as: 'plan' }],
            },
          ],
        },
        { page, page_size }
      );
    }

    const students = await Student.findAll(query);
    const total = await Student.count();

    return res.status(200).json({
      students,
      total,
      page,
      page_count: Math.ceil(
        total / (Number(page_size) > 0 ? Number(page_size) : 5)
      ),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      include: [
        {
          model: Enrollment,
          as: 'enrollment',
          attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
          include: [{ model: Plan, as: 'plan' }],
        },
      ],
      where: { id },
    });

    return res.status(200).json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    if (await Student.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'Student already exists. ' });
    }

    const student = await Student.create({ ...req.body });

    return res.status(201).json(student);
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        age: Yup.number(),
        weight: Yup.number(),
        height: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validate fails' });
      }

      const { name, email, idade, peso, altura } = req.body;

      const student = await Student.findByPk(req.params.student_id);

      if (email && email !== student.email) {
        if (await Student.findOne({ where: { email } })) {
          return res.status(400).json({ error: 'Student already exists. ' });
        }
      }

      const { id } = await student.update({
        name,
        email,
        idade,
        peso,
        altura,
      });

      return res.json({ id, name, email, idade, peso, altura });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async destroy(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({ error: 'Student not found. ' });
      }

      await student.destroy();

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new StudentController();
