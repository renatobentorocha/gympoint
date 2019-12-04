import request from 'supertest';
import faker from 'faker';
import factory from '../factories';
import app from '../../src/app';

import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Enrollment controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrieve all enrollments when logged in as an admin', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    const enrollments = await request(app)
      .get(`/enrollments`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(200);
  });

  it('should be able to retrieve an enrollment when logged in as an admin', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollments = await request(app)
      .get(`/enrollments/${enrollment.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(200);
  });

  it('should be able to create new enrollment when logged in as an admin', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.attrs('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollments = await request(app)
      .post(`/enrollments`)
      .send(enrollment)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(201);
  });

  it('should be able to fail creating a new enrollment when validation fail', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.attrs('Enrollment', {
      _student_id: student.id,
      plan_id: plan.id,
    });

    const enrollments = await request(app)
      .post(`/enrollments`)
      .send(enrollment)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(400);
  });

  it('should be able to fail creating a new enrollment when student not found', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.attrs('Enrollment', {
      student_id: student.id + 1,
      plan_id: plan.id,
    });

    const enrollments = await request(app)
      .post(`/enrollments`)
      .send(enrollment)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(400);
  });

  it('should be able to fail creating a new enrollment when plan not found', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.attrs('Enrollment', {
      student_id: student.id,
      plan_id: plan.id + 2,
    });

    const enrollments = await request(app)
      .post(`/enrollments`)
      .send(enrollment)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollments.status).toBe(400);
  });

  it('should be able to fail updating when validation fails', async () => {
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
    let plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    plan = await factory.create('Plan');

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ plan_id: plan.id })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(400);
  });

  it('should be able to fail updating when student not found', async () => {
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
    let plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    plan = await factory.create('Plan');

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ student_id: student.id + 1 })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(400);
  });

  it('should be able to fail updating when plan not found', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ ...enrollment.dataValues, plan_id: plan.id + 1 })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(400);
  });

  it("should be able to updating a enrollment's plan", async () => {
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
    let plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    plan = await factory.create('Plan');

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ ...enrollment.dataValues, plan_id: plan.id })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(200);
  });

  it("should be able to updating a enrollment's start date", async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ ...enrollment.dataValues, start_date: faker.date.recent() })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(200);
  });

  it("should be able to updating a enrollment's student", async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
      admin: true,
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    let student = await factory.create('Student');
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    student = await factory.create('Student', {
      email: faker.internet.email(),
    });

    const enrollment_updated = await request(app)
      .put(`/enrollments/${enrollment.id}`)
      .send({ ...enrollment.dataValues, student_id: student.id })
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(200);
  });

  it('should be able to deleting a enrollment', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollment_updated = await request(app)
      .delete(`/enrollments/${enrollment.id}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(204);
  });

  it('should be able to fail deleting a enrollment when not found', async () => {
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
    const plan = await factory.create('Plan');

    const enrollment = await factory.create('Enrollment', {
      student_id: student.id,
      plan_id: plan.id,
    });

    const enrollment_updated = await request(app)
      .delete(`/enrollments/${enrollment.id + 1}`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(enrollment_updated.status).toBe(400);
  });
});
