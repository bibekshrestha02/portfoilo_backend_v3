import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';
describe('Contact Route', () => {
  beforeAll(async () => {
    testRun();
  });
  let token: string;

  beforeEach(async () => {
    let user = new UserModel({});
    token = user.generateToken();
    await user.save();
  });
  beforeEach(async () => await UserModel.create({}));

  afterEach(async () => await UserModel.deleteMany({}));
  afterAll(async () => connection.close());

  describe('PUT: /api/v1/contact', () => {
    let title: string, detail: string, subDetail: string, email: string;
    beforeEach(() => {
      title = "Let's Chat!";
      detail = 'Lets have a conversation';
      subDetail = 'check out my social media for more';
      email = 'shresthabbks@gmail.com';
    });

    const exec = () =>
      request(app)
        .put('/api/v1/contact')
        .send({ title, detail, subDetail, email })
        .set({ 'x-auth-token': token });

    describe('Validate Inputs', () => {
      it('should return status 400 if title is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if detail is not send', async () => {
        detail = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if subDetail is not send', async () => {
        subDetail = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if email is not send', async () => {
        email = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if invalid email is send', async () => {
        email = 'allu.com';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    it('should update contact fields in UserModel and send status 200,response contain fields title, detail, subDetail, email', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ 'contact.title': title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('detail');
      expect(res.body).toHaveProperty('subDetail');
      expect(res.body).toHaveProperty('email');
    });
  });

  describe('GET: /api/v1/contact', () => {
    const exec = () => request(app).get('/api/v1/contact');

    it('should send status 200 and response contain fields title, detail, subDetail, email', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('detail');
      expect(res.body).toHaveProperty('subDetail');
      expect(res.body).toHaveProperty('email');
    });
  });
});
