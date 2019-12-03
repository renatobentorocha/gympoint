import factory from 'factory-girl';
import faker from 'faker';
import User from '../src/app/models/User';
import Student from '../src/app/models/Student';
import Checkin from '../src/app/models/Checkin';

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

export default factory;
