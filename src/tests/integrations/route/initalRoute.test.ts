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
  afterEach(async () => {
    await UserModel.deleteMany({});
    await SocialLinkModel.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('Inital Route: GET: /api/v1/', () => {
    const exec = () => {
      return Request(app).get('/api/v1/');
    };

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
});
