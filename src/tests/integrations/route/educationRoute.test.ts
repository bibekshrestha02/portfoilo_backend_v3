import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';
import EducationModel from '../../../model/educationModel';
describe('Education Route', () => {
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

  afterEach(async () => {
    await UserModel.deleteMany({});
    await EducationModel.deleteMany({});
  });
  afterAll(async () => connection.close());
  describe('Get: api/v1/education/', () => {
    let data = {
      name: 'Orchid',
      place: 'Harion',
      year: 2014,
      branch: 'SEE',
    };
    beforeEach(async () => {
      let education = new EducationModel(data);

      await UserModel.findOneAndUpdate(
        {},
        { $push: { 'education.data': education._id } }
      );
      await education.save();
    });
    const exec = () => request(app).get('/api/v1/education/');

    it('should get title with data field with stauts 200', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
      expect(res.body).toHaveProperty('data');
    });

    it('should populate field data of response', async () => {
      const res = await exec();
      expect(res.body.data).toEqual(
        expect.arrayContaining([expect.objectContaining(data)])
      );
    });
  });

  describe('Get: /api/v1/education/all', () => {
    const exec = () => request(app).get('/api/v1/education/all');

    it('should return status 200', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('PUT: /api/v1/education/title', () => {
    let title: string;
    beforeEach(() => {
      title = 'educations';
    });
    const exec = () =>
      request(app)
        .put('/api/v1/education/title')
        .send({ title })
        .set({ 'x-auth-token': token });

    describe('Validate', () => {
      it('should return status 400 if title is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should return status 200 and update title', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ 'education.title': title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
    });
  });

  describe('Post: /api/v1/education/', () => {
    let name: String, place: String, year: any, branch: String;
    beforeEach(() => {
      name = 'Orchid English School';
      place = 'Harion 11 Sarlahi';
      year = 2018;
      branch = 'SEE';
    });
    const exec = () =>
      request(app)
        .post('/api/v1/education')
        .send({ name, place, year, branch })
        .set({ 'x-auth-token': token });

    describe('Validate Fileds', () => {
      it('should return status 400 if name is not send', async () => {
        name = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if place is not send', async () => {
        place = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if year is  send as string', async () => {
        year = 'asdf';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if branch is not send', async () => {
        branch = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should create Education', async () => {
      await exec();
      const result = await EducationModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 201 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('place');
      expect(res.body).toHaveProperty('year');
      expect(res.body).toHaveProperty('branch');
    });

    it('should save id to education Fields', async () => {
      const res = await exec();
      const result = await UserModel.findOne({
        'education.data': [res.body._id],
      });
      expect(result).not.toBeNull();
    });
  });

  describe('Put: /api/v1/education/:id', () => {
    let name: String, place: String, year: any, branch: String, id: String;
    beforeEach(() => {
      name = 'Orchid English School';
      place = 'Harion 11 Sarlahi';
      year = 2018;
      branch = 'SEE';
    });
    beforeEach(async () => {
      let education = new EducationModel({ name, place, year, branch });
      id = education._id;
      await education.save();
    });
    const exec = () =>
      request(app)
        .put(`/api/v1/education/${id}`)
        .send({ name, place, year, branch })
        .set({ 'x-auth-token': token });

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await EducationModel.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    describe('Validate Fileds', () => {
      it('should return status 400 if name is not send', async () => {
        name = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if place is not send', async () => {
        place = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if year is  send as string', async () => {
        year = 'asdf';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if branch is not send', async () => {
        branch = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should update Education', async () => {
      name = 'JJMC';
      await exec();
      const result = await EducationModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 200 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('place');
      expect(res.body).toHaveProperty('year');
      expect(res.body).toHaveProperty('branch');
    });
  });

  describe('Delete: /api/v1/education/:id', () => {
    let name: String, place: String, year: any, branch: String, id: String;
    beforeEach(() => {
      name = 'Orchid English School';
      place = 'Harion 11 Sarlahi';
      year = 2018;
      branch = 'SEE';
    });
    beforeEach(async () => {
      let education = new EducationModel({ name, place, year, branch });
      id = education._id;
      await education.save();
    });
    const exec = () =>
      request(app)
        .delete(`/api/v1/education/${id}`)
        .set({ 'x-auth-token': token });

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await EducationModel.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    it('should delete Education', async () => {
      await exec();
      const result = await EducationModel.findById(id).lean();
      expect(result).toBeNull();
    });

    it('should return status 200 ', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
