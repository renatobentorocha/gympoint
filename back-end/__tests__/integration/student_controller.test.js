import request from 'supertest';
import faker from 'faker';
import factory from '../factories';
import app from '../../src/app';
import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Check-in controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrive students', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const check_ins = await request(app)
      .get(`/students`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(check_ins.status).toBe(200);
  });

  it('should be able to retrieve an especific student', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.create('Student');

    const response = await request(app)
      .get(`/students/${student.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(student.id);
  });

  it('should be able to create a student', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.attrs('Student');

    const response = await request(app)
      .post(`/students`)
      .send(student)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(student.name);
  });

  it('should be able to fail creating a student when validation fails', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const response = await request(app)
      .post(`/students`)
      .send({})
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to fail creating student when already exists', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.create('Student');

    const student_attrs = await factory.attrs('Student', {
      email: student.email,
    });

    const response = await request(app)
      .post(`/students`)
      .send({ student_attrs })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to update a student', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.create('Student');

    const email = faker.internet.email();

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send({ email })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toEqual(email);
  });

  it('should be able to fail update a student when validation fails', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.create('Student');

    const age = faker.internet.email();

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send({ age })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to fail updating student when already exists', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const { email } = await factory.create('Student');

    const student = await factory.create('Student', {
      email: faker.internet.email(),
    });

    const student_attrs = await factory.attrs('Student', {
      email,
    });

    const response = await request(app)
      .put(`/students/${student.id}`)
      .send(student_attrs)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to remove a student', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const student = await factory.create('Student');

    const response = await request(app)
      .delete(`/students/${student.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(204);
  });

  it('should be able to fail removing a student when he not exists', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const response = await request(app)
      .delete(`/students/${10}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });
});
