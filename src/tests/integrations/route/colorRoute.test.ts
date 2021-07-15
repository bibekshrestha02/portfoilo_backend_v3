import request from 'supertest';
import app from '../../../app';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import colorModel from '../../../model/colorModel';
describe('Route: /api/v1/color/', () => {
  beforeAll(async () => {
    await testRun();
  });
  afterAll(async () => {
    await connection.close();
  });
  afterEach(async () => {
    await colorModel.deleteMany({});
  });

  describe('Post : /api/v1/color/', () => {
    let name: String, value: String;
    beforeEach(() => {
      name = 'primary';
      value = '#f1f1f1';
    });
    const exec = () =>
      request(app).post('/api/v1/color/').send({ name, value });

    describe('Validate Fields', () => {
      it('should return status 400 if name is not send', async () => {
        name = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if value is not send', async () => {
        value = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if name is not unique', async () => {
        await colorModel.create({ name, value });
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should create color and send status 201', async () => {
      const res = await exec();
      const result = await colorModel.findOne({ name });
      expect(result).not.toBeNull();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('primary');
    });
  });

  describe('Get : /api/v1/color/', () => {
    let name: String, value: String;
    beforeEach(async () => {
      name = 'primary';
      value = '#f1f1f1';
      await colorModel.create({ name, value });
      await colorModel.create({ name: 'secondary', value });
    });
    const exec = () => request(app).get('/api/v1/color/').send({ name, value });

    it('should return all color and send status 200', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('primary');
    });
  });

  describe('Delete : /api/v1/color/:name', () => {
    let name: String, value: String;
    beforeEach(async () => {
      name = 'primary';
      value = '#f1f1f1';
      await colorModel.create({ name, value });
      await colorModel.create({ name: 'secondary', value });
    });
    const exec = () => request(app).delete(`/api/v1/color/${name}`);

    it('should return status 400 if name is invalid', async () => {
      name = 'sdfsad';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should delete color and send status 200', async () => {
      const res = await exec();
      const result = await colorModel.findOne({ name });

      expect(result).toBeNull();
      expect(res.status).toBe(200);
    });
  });

  describe('Put : /api/v1/color/:name', () => {
    let name: String, value: String;
    beforeEach(async () => {
      name = 'primary';
      value = '#f1f1f1';
      await colorModel.create({ name, value });
    });
    const exec = () =>
      request(app).put(`/api/v1/color/${name}`).send({ value });
    describe('Validate Fiels', () => {
      it('should return status 400 if name is invalid', async () => {
        name = 'sdfsad';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if value is not send', async () => {
        value = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    it('should update color and send status 200', async () => {
      const res = await exec();
      const result = await colorModel.findOne({ name, value });

      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
    });
  });
});
