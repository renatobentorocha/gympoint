import request from 'supertest';
import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';

describe('Admin session controller', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to fail when validation schema fails', async () => {
    const credential = {
      email: 'admin@gympoint.com.br',
      password: '123456',
    };

    await factory.create('User', credential);

    credential.password = null;

    const session = await request(app)
      .post('/session')
      .send(credential);

    expect(session.status).toBe(400);
  });

  it('should be able to fail when admin not found', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
    };

    await factory.create('User', credential);

    credential.email = 'maria@vuttr.com.br';

    const session = await request(app)
      .post('/session')
      .send(credential);

    expect(session.status).toBe(401);
  });

  it('should be able to fail when admin password not match', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
    };

    await factory.create('User', credential);

    credential.password = '123456789';

    const session = await request(app)
      .post('/session')
      .send(credential);

    expect(session.status).toBe(401);
  });

  it('should be able create a token session', async () => {
    const credential = {
      email: 'admin@gympoint.com',
      password: '123456',
    };

    await factory.create('User', credential);

    const session = await request(app)
      .post('/session')
      .send(credential);

    expect(session.status).toBe(201);
  });
});
