import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Student session controller', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to fail when validation schema fails', async () => {
    await factory.create('Student');

    const session = await request(app)
      .post('/session')
      .send({})
      .set('application', 'MOBILE');

    expect(session.status).toBe(400);
  });

  it('should be able to fail when student not found', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id: id + 1 })
      .set('application', 'MOBILE');

    expect(session.status).toBe(401);
  });

  it('should be able create a token session', async () => {
    const student = await factory.create('Student');

    const { id } = student;

    const session = await request(app)
      .post('/session')
      .send({ id })
      .set('application', 'MOBILE');

    expect(session.status).toBe(201);
  });
});
