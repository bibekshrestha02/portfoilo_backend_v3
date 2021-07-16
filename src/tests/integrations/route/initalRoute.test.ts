import Request from 'supertest';
import app from '../../../app';
import mongoose from 'mongoose';
import { testRun } from '../../../startup/db';
import UserModel from '../../../model/usersModel';
import SocialLinkModel from '../../../model/socialLinkModel';
describe('Inital Route: /api/v1/', () => {
  beforeAll(() => {
    testRun();
  });
  let token: string;

  beforeEach(async () => {
    let user = new UserModel({});
    token = user.generateToken();
    await user.save();
  });
  afterEach(async () => {
    await UserModel.deleteMany({});
    await SocialLinkModel.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe(' GET: /api/v1/', () => {
    const exec = () => {
      return Request(app).get('/api/v1/');
    };
    beforeEach(async () => await UserModel.deleteMany({}));

    it('should create User Model if its not exist', async () => {
      await exec();
      const user = await UserModel.find({}).lean();
      expect(user.length).toBe(1);
    });

    it("shouldn't create User Model if its  exist", async () => {
      await UserModel.create({ isCreate: 'false' });
      await exec();
      const user = await UserModel.find({}).lean();
      expect(user.length).toBe(1);
    });

    it('should populate social Links', async () => {
      await UserModel.create({});
      let socialLinkData = {
        name: 'Facebook',
        iconPath: 'https://meropasl.com/bibke',
        link: 'https://Hellow.com',
      };
      const sociaLink = new SocialLinkModel(socialLinkData);

      await sociaLink.save(async function () {
        await UserModel.findOneAndUpdate(
          {},
          {
            $push: { socialLinks: sociaLink._id },
          }
        );
      });
      const res = await exec();
      expect(res.body.socialLinks).toEqual(
        expect.arrayContaining([expect.objectContaining(socialLinkData)])
      );
    });

    it('should only return filed: name, title, profileImagePath, socialLinks, Colors', async () => {
      let fields: string[] = [
        'name',
        'title',
        'profileImagePath',
        'socialLinks',
        'colors',
      ];
      const res = await exec();

      fields.forEach((filed) => expect(res.body).toHaveProperty(filed));
    });
  });

  describe('Put: /api/v1/name', () => {
    let name: string, title: string;
    beforeEach(async () => {
      await UserModel.create({});
    });
    beforeEach(() => {
      name = 'Bibek Shrestha';
      title = 'MERN Stack Developer';
    });
    function exec() {
      return Request(app)
        .put('/api/v1/name')
        .send({ name, title })
        .set({ 'x-auth-token': token });
    }
    describe('validate name and tile', () => {
      it('should return status 400 if name  is not send', async () => {
        name = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
      it('should return status 400 if title  is not send', async () => {
        title = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should save and send status response 200 with title and name ', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ name: name, title: title });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('title');
    });
  });

  describe('Put: /api/v1/profileImage', () => {
    let profileImagePath: string;
    beforeEach(async () => {
      await UserModel.create({});
    });
    beforeEach(() => {
      profileImagePath = 'https://bbks.com/profile';
    });
    function exec() {
      return Request(app)
        .put('/api/v1/profileImage')
        .send({ profileImagePath })
        .set({ 'x-auth-token': token });
    }
    describe('Validate ProfileImagePath', () => {
      it('should return status 400 if profileImagePath  is not send', async () => {
        profileImagePath = '';
        const res = await exec();
        expect(res.status).toBe(400);
      });
    });
    it('should save and send status response 200 with profileImagePath ', async () => {
      const res = await exec();
      const result = await UserModel.findOne({ profileImagePath });
      expect(result).not.toBeNull();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('profileImagePath');
    });
  });
});
