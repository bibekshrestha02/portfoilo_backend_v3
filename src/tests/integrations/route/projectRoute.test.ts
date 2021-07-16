import app from '../../../app';
import request from 'supertest';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import UserModel from '../../../model/usersModel';
import ProjectModel from '../../../model/projectModel';
describe('Project Route', () => {
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
    await ProjectModel.deleteMany({});
  });
  afterAll(async () => connection.close());

  describe('Get: api/v1/project/', () => {
    let data = {
      name: 'HTMl',
      iconPath: 'https://fb.com',
      link: 'https://fb.com',
    };
    beforeEach(async () => {
      let project = new ProjectModel(data);

      await UserModel.findOneAndUpdate(
        {},
        { $push: { 'project.data': project._id } }
      );
      await project.save();
    });

    const exec = () => request(app).get('/api/v1/project/');

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

  describe('Get: /api/v1/project/all', () => {
    const exec = () => request(app).get('/api/v1/project/all');

    it('should return status 200', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('PUT: /api/v1/project/title', () => {
    let title: string;
    beforeEach(() => {
      title = 'Projects';
    });
    const exec = () =>
      request(app)
        .put('/api/v1/project/title')
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
      const result = await UserModel.findOne({ 'project.title': title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title');
    });
  });

  describe('Post: /api/v1/project/', () => {
    let name: String, iconPath: String, link: any;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
      link = 'https://fb.com';
    });
    const exec = () =>
      request(app)
        .post('/api/v1/project')
        .send({ name, iconPath, link })
        .set({ 'x-auth-token': token });

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

      it('should return status 400 if link is not send', async () => {
        link = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should create project', async () => {
      await exec();
      const result = await ProjectModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 201 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('iconPath');
      expect(res.body).toHaveProperty('link');
    });

    it('should save id to project Fields', async () => {
      const res = await exec();
      const result = await UserModel.findOne({
        'project.data': [res.body._id],
      });
      expect(result).not.toBeNull();
    });
  });

  describe('Put: /api/v1/project/:id', () => {
    let name: String, iconPath: String, link: any, id: String;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
      link = 'https://fb.com';
    });
    beforeEach(async () => {
      let project = new ProjectModel({ name, iconPath, link });
      id = project._id;
      await project.save();
    });
    const exec = () =>
      request(app)
        .put(`/api/v1/project/${id}`)
        .send({ name, iconPath, link })
        .set({ 'x-auth-token': token });

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await ProjectModel.deleteMany({});
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

      it('should return status 400 if link is not send', async () => {
        link = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should update project', async () => {
      name = 'JJMC';
      await exec();
      const result = await ProjectModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return status 200 with fields', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('iconPath');
      expect(res.body).toHaveProperty('link');
    });
  });

  describe('Delete: /api/v1/project/:id', () => {
    let name: String, iconPath: String, link: any, id: String;
    beforeEach(() => {
      name = 'HTMl';
      iconPath = 'https://fb.com';
      link = 'https://fb.com';
    });
    beforeEach(async () => {
      let project = new ProjectModel({ name, iconPath, link });
      id = project._id;
      await project.save();
    });

    const exec = () =>
      request(app)
        .delete(`/api/v1/project/${id}`)
        .set({ 'x-auth-token': token });

    describe('Validate Id', () => {
      it('should return status 400 if id is invalid', async () => {
        id = 'asdfas';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it("should return status 400 if  id's data not find", async () => {
        await ProjectModel.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });

    it('should delete project', async () => {
      await exec();
      const result = await ProjectModel.findById(id).lean();
      expect(result).toBeNull();
    });

    it('should return status 200 ', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
