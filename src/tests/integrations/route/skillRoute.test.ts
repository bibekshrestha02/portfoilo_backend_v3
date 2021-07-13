import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';
import SkillModel from '../../../model/skillModel';
describe('Skill Route', () => {
  beforeAll(async () => {
    testRun();
  });

  beforeEach(async () => await UserModel.create({}));

  afterEach(async () => {
    await UserModel.deleteOne({});
    await SkillModel.deleteMany({});
  });
  afterAll(async () => connection.close());

  describe('PUT: /api/v1/skill/title', () => {
    let title: string;
    beforeEach(() => {
      title = 'Skills';
    });
    const exec = () => request(app).put('/api/v1/skill/title').send({ title });

    describe('Validate', () => {
      it('should return status 400 if title is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should return status 200 and update title', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ 'skill.title': title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
    });
  });

  describe('Get: /api/v1/skill/all', () => {
    const exec = () => request(app).get('/api/v1/skill/all');

    it('should return status 200', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('Post: /api/v1/skill/', () => {
    let name: String, iconPath: String;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
    });
    const exec = () =>
      request(app).post('/api/v1/skill').send({ name, iconPath });

    describe('Validate Fileds', () => {
      it('should return status 400 if name is not send', async () => {
        name = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });

      it('should return status 400 if iconPath is not send', async () => {
        iconPath = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should create skill', async () => {
      await exec();
      const result = await SkillModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 201 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('iconPath');
    });

    it('should save id to skill Fields', async () => {
      const res = await exec();
      const result = await UserModel.findOne({
        'skill.data': [res.body._id],
      });
      expect(result).not.toBeNull();
    });
  });

  describe('Put: /api/v1/skill/:id', () => {
    let name: String, iconPath: String, id: String;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
    });
    beforeEach(async () => {
      let skill = new SkillModel({ name, iconPath });
      id = skill._id;
      await skill.save();
    });
    const exec = () =>
      request(app).put(`/api/v1/skill/${id}`).send({ name, iconPath });

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await SkillModel.deleteMany({});
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

      it('should return status 400 if iconPath is not send', async () => {
        iconPath = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should update skill', async () => {
      name = 'JJMC';
      await exec();
      const result = await SkillModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 200 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('iconPath');
    });
  });

  describe('Delete: /api/v1/skill/:id', () => {
    let name: String, iconPath: String, id: String;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
    });
    beforeEach(async () => {
      let skill = new SkillModel({ name, iconPath });
      id = skill._id;
      await skill.save();
    });

    const exec = () => request(app).delete(`/api/v1/skill/${id}`);

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await SkillModel.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    it('should delete skill', async () => {
      await exec();
      const result = await SkillModel.findById(id).lean();
      expect(result).toBeNull();
    });

    it('should return status 200 ', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
