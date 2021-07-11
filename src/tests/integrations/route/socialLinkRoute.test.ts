import request from 'supertest';
import app from '../../../app';
import { testRun } from '../../../startup/db';
import { connection } from 'mongoose';
import SocialLinkModel from '../../../model/socialLinkModel';
import UsersModel from '../../../model/usersModel';
describe('Route /api/v1/socialLink/', () => {
  beforeAll(async () => {
    await testRun();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await UsersModel.create({});
  });
  afterEach(async () => {
    await SocialLinkModel.deleteMany({});
    await UsersModel.deleteMany({});
  });
  describe('Post /api/v1/socialLink/', () => {
    let name: String, iconPath: String, link: String;

    beforeEach(() => {
      name = 'FaceBook';
      iconPath =
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZS8+PGcgZGF0YS1uYW1lPSJmYWNlYm9vayBmYiBmYWNlIGJvb2siIGlkPSJmYWNlYm9va19mYl9mYWNlX2Jvb2siPjxwYXRoIGQ9Ik0yNCwzSDhBNSw1LDAsMCwwLDMsOFYyNGE1LDUsMCwwLDAsNSw1aDhhMSwxLDAsMCwwLDEtMVYyMGExLDEsMCwwLDAtMS0xSDE1VjE3aDFhMSwxLDAsMCwwLDEtMVYxMi41QTIuNSwyLjUsMCwwLDEsMTkuNSwxMEgyMnYySDIxYTIsMiwwLDAsMC0yLDJ2MmExLDEsMCwwLDAsMSwxaDEuNzJsLS41LDJIMjBhMSwxLDAsMCwwLTEsMXY0YTEsMSwwLDAsMCwyLDBWMjFoMWExLDEsMCwwLDAsMS0uNzZsMS00YTEsMSwwLDAsMC0uMTgtLjg2QTEsMSwwLDAsMCwyMywxNUgyMVYxNGgyYTEsMSwwLDAsMCwxLTFWOWExLDEsMCwwLDAtMS0xSDE5LjVBNC41MSw0LjUxLDAsMCwwLDE1LDEyLjVWMTVIMTRhMSwxLDAsMCwwLTEsMXY0YTEsMSwwLDAsMCwxLDFoMXY2SDhhMywzLDAsMCwxLTMtM1Y4QTMsMywwLDAsMSw4LDVIMjRhMywzLDAsMCwxLDMsM1YyNGEzLDMsMCwwLDEtMywzSDIwYTEsMSwwLDAsMCwwLDJoNGE1LDUsMCwwLDAsNS01VjhBNSw1LDAsMCwwLDI0LDNaIi8+PC9nPjwvc3ZnPg==';
      link = 'https://www.facebook.com/bbek2059/';
    });

    function exec() {
      return request(app)
        .post('/api/v1/socialLink')
        .send({ name, iconPath, link });
    }

    describe('Validate field', () => {
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

    it('should save socialLink', async () => {
      await exec();
      const result = await SocialLinkModel.findOne({ name: name }).lean();
      expect(result).not.toBeNull();
    });

    it('should return fileds: _id, iconPath, link', async () => {
      const fields = ['_id', 'iconPath', 'link'];
      const res = await exec();
      fields.forEach((field) => {
        expect(res.body).toHaveProperty(field);
      });
    });

    it('should return status 201 if all data is correct', async () => {
      const res = await exec();
      expect(res.status).toBe(201);
    });

    it('should push save socialLink _id to user SocialLink', async () => {
      const res = await exec();
      const result = await UsersModel.findOne({}).lean();
      expect(result.socialLinks[0].toString()).toBe(res.body._id.toString());
    });
  });
});
