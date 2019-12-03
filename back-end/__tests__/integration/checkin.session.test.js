import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate, {
  disable_foreign_keys_checkin_before,
} from '../util/truncate';

describe('Check-in controller', () => {
  beforeEach(async () => {
    await disable_foreign_keys_checkin_before(truncate);
  });

  it('should be able to retrive check-ins', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const check_ins = await request(app)
      .get(`/students/${id}/checkins`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(check_ins.status).toBe(200);
  });

  it('should be able to fail check-in when student not found', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const check_ins = await request(app)
      .post(`/students/${0}/checkins`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(check_ins.status).toBe(400);
  });

  it('should be able to fail check-in exced maximum of five on a interval of five sequence days ', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    await factory.createMany('Checkin', 5, {
      student_id: id,
    });

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const check_ins = await request(app)
      .post(`/students/${id}/checkins`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(check_ins.status).toBe(403);
  });

  it('should be able to check-in', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    const check_ins = await request(app)
      .post(`/students/${id}/checkins`)
      .set('Authorization', `Bearer ${session.body.token}`);

    expect(check_ins.status).toBe(201);
  });
});
