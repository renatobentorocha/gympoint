import factory from 'factory-girl';
import faker from 'faker';
import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Checkin from '../src/app/models/Checkin';
import Enrollment from '../src/app/models/Enrollment';
import Plan from '../src/app/models/Plan';
import HelpOrder from '../src/app/models/HelpOrder';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  admin: false,
});

factory.define('Student', Student, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 20, max: 55 }),
  weight: faker.random.number({ min: 60, max: 85, precision: 2 }),
  height: faker.random.number({ min: 1.6, max: 1.9, precision: 2 }),
});

factory.define('Checkin', Checkin, {
  student_id: faker.random.number(),
});

factory.define('Enrollment', Enrollment, {
  start_date: faker.date.past(),
  end_date: faker.date.future(),
  price: faker.random.number({ min: 55, max: 1000, precision: 2 }),
});

factory.define('Plan', Plan, {
  title: faker.name.jobArea(),
  duration: faker.random.number({ min: 1, max: 6 }),
  price: faker.random.number({ min: 55, max: 1000, precision: 2 }),
});

factory.define('HelpOrder', HelpOrder, {
  question: faker.lorem.paragraph(),
  answer: faker.lorem.paragraph(),
  answer_at: faker.date.past(),
});
export default factory;
