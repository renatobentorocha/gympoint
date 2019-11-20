import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Student from '../models/Student';
import authConfig from '../../config/auth';

class StudentSession {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student not found.' });
    }

    const { name, email } = student;

    return res.status(200).json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new StudentSession();
