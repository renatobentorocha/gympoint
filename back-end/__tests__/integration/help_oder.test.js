import request from 'supertest';
import faker from 'faker';
import factory from '../factories';
import app from '../../src/app';

import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Help order controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrieve all help order', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const help_orders = await request(app)
      .get(`/students/${id}/help_orders`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(help_orders.status).toBe(200);
  });

  it('should be able to retrieve an especific help order', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
    });

    const response = await request(app)
      .get(`/students/${id}/help_orders/${help_order.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(help_order.id);
  });

  it('should be able to fail  when retrieve an especific help order that not exists', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const response = await request(app)
      .get(`/students/${id}/help_orders/${10}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to create a help order', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const question = faker.lorem.paragraph();

    const response = await request(app)
      .post(`/students/${id}/help_orders`)
      .send({ question })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body.question).toBe(question);
  });

  it('should be able to fail creating a help order when the student not exists', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const question = faker.lorem.paragraph();

    const response = await request(app)
      .post(`/students/${10}/help_orders`)
      .send({ question })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });
});
