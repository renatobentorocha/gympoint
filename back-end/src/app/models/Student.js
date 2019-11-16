import Sequelize, { Model, Op } from 'sequelize';
import Enrollment from './Enrollment';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL(10, 2),
        height: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Enrollment, {
      foreignKey: 'student_id',
      as: 'enrollment',
    });
  }
}

Student.prototype.getEnrollmentActive = async function() {
  try {
    const res = await Enrollment.findAll(
      {
        where: {
          student_id: this.id,
          end_date: { [Op.gte]: new Date() },
        },
      },
      { raw: true }
    );

    return res.length > 0;
  } catch (error) {
    return null;
  }
};

export default Student;
