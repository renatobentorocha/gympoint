import request from 'supertest';
import faker from 'faker';
import factory from '../factories';
import app from '../../src/app';

import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Gym help order controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrieve all unanswered help order when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const help_orders = await request(app)
      .get(`/help_orders`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(help_orders.status).toBe(200);
  });

  it('should be able to retrieve an unanswered help order when logged in as an admin', async () => {
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

    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
    });

    const response = await request(app)
      .get(`/help_orders/${help_order.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(help_order.id);
  });

  it('should be able to fail when retrieve an unanswered help order and that not exists', async () => {
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
      .get(`/help_orders/${1}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to answer a help order when logged in as an admin', async () => {
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

    const help_order = await factory.create('HelpOrder', {
      student_id: student.id,
      answer: '',
      answer_at: null,
    });

    const text = faker.lorem.paragraph();

    const response = await request(app)
      .post(`/help_orders/${help_order.id}/answer`)
      .send({ answer: text })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body.answer_at).not.toBeNull();
    expect(response.body.answer).toBe(text);
  });

  it('should be able to fail when answer and a help order not exists', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const text = faker.lorem.paragraph();

    const response = await request(app)
      .post(`/help_orders/${10}/answer`)
      .send({ answer: text })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });
});
