import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
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
