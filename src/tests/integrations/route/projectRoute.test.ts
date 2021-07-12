import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';

describe('Project Route', () => {
  beforeAll(async () => {
    testRun();
  });

  beforeEach(async () => await UserModel.create({}));

  afterEach(async () => await UserModel.deleteOne({}));
  afterAll(async () => connection.close());

  describe('PUT: /api/v1/project/title', () => {
    let title: string;
    beforeEach(() => {
      title = 'Projects';
    });
    const exec = () =>
      request(app).put('/api/v1/project/title').send({ title });

    describe('Validate', () => {
      it('should return status 400 if title is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should return status 200 and update title', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ 'project.title': title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
    });
  });
});
