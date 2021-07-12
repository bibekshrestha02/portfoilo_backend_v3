import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';
describe('About Route', () => {
  beforeAll(async () => {
    testRun();
  });

  beforeEach(async () => await UserModel.create({}));

  afterEach(async () => await UserModel.deleteOne({}));
  afterAll(async () => connection.close());

  describe('PUT /api/v1/about', () => {
    let title: string, subTitle: string, cvPath: string, description: string;
    beforeEach(() => {
      title = "Hellow, I'm Bibek";
      subTitle = 'I make web and mobile applications';
      cvPath = 'https://google.com/cv';
      description = 'I have been writing code since 2018';
    });

    const exec = () =>
      request(app)
        .put('/api/v1/about')
        .send({ title, subTitle, cvPath, description });

    describe('Validate Inputs', () => {
      it('should return status 400 if title is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if subTitle is not send', async () => {
        subTitle = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if cvPath is not send', async () => {
        cvPath = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if description is not send', async () => {
        description = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should update about fields in UserModel and send status 200,response contain fields title, subTitle, cvPath, description', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ 'about.title': title });

      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('subTitle');
      expect(res.body).toHaveProperty('cvPath');
      expect(res.body).toHaveProperty('description');
    });
  });
});
