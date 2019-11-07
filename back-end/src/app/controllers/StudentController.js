import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class StudentController {
  async index(req, res) {
    const { q } = req.query;

    let students = null;

    if (q) {
      students = await Student.findAll({
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
      });
    } else {
      students = await Student.findAll({
        include: [
          {
            model: Enrollment,
            as: 'enrollment',
            attributes: ['start_date', 'end_date', 'price', 'active'],
          },
        ],
      });
    }

    const studentsFiltered = await Promise.all(
      await students.map(async s => {
        const { id, name, email, age, weight, height, enrollment } = s;
        const enrollment_active = await s.getEnrollmentActive();

        return {
          id,
          name,
          email,
          age,
          weight,
          height,
          enrollment,
          enrollment_active,
        };
      })
    );

    return res.status(200).json(studentsFiltered);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
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

    return res.json(student);
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
}

module.exports = new StudentController();
