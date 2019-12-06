import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';

import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Gym help order controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrieve all plans when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plans = await request(app)
      .get(`/plans`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(plans.status).toBe(200);
  });

  it('should be able to retrieve a plan when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plan = await factory.create('Plan');

    const response = await request(app)
      .get(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(plan.id);
  });

  it('should be able to create a plan when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plan = await factory.attrs('Plan');

    const response = await request(app)
      .post(`/plans`)
      .send(plan)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(201);
  });

  it('should be able to fail when plan creating validation fails', async () => {
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
      .post(`/help_orders/${10}/answer`)
      .send({})
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to updating a created plan when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plan = await factory.attrs('Plan');

    const {
      body: { id },
    } = await request(app)
      .post(`/plans`)
      .send(plan)
      .set('Authorization', `Bearer ${session.body.token}`);

    const response = await request(app)
      .put(`/plans/${id}`)
      .send({ ...plan, title: 'title updated' })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.title).not.toEqual(plan.title);
  });

  it('should be able to fail when updating a plan that validation fails', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plan = await factory.attrs('Plan');

    const {
      body: { id },
    } = await request(app)
      .post(`/plans`)
      .send(plan)
      .set('Authorization', `Bearer ${session.body.token}`);

    const response = await request(app)
      .put(`/plans/${id}`)
      .send({ ...plan, price: 'string' })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to fail when updating a plan that not exists', async () => {
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
      .put(`/plans/${10}`)
      .send({})
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });

  it('should be able to remove a plan when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const plan = await factory.create('Plan');

    const response = await request(app)
      .delete(`/plans/${plan.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(204);
  });

  it('should be able to fail when remove a plan that not exists', async () => {
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
      .delete(`/plans/${40}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(response.status).toBe(400);
  });
});
