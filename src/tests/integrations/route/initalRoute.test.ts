import Request from 'supertest';
import app from '../../../app';
import mongoose from 'mongoose';
import { testRun } from '../../../startup/db';
import UserModel from '../../../model/usersModel';
describe('Inital Route: /api/v1/', () => {
  beforeAll(() => {
    testRun();
  });
  afterEach(async () => {
    await UserModel.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return status 200', async () => {
    const users = await UserModel.find({});
    await UserModel.create({ name: 'Bibek' });
    console.log(users);
    const res = await Request(app).get('/api/v1/');
    expect(res.status).toBe(200);
  });
});
