import { Response, Request, NextFunction } from 'express';
import { socialLinkValidationSchema } from '../model/socialLinkModel';
import SocialLinkModel from '../model/socialLinkModel';
import UsersModel from '../model/usersModel';

export async function createSocialLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await socialLinkValidationSchema.validate(req.body);
    const { name, link, iconPath } = req.body;

    const socialLink = new SocialLinkModel({ name, link, iconPath });

    const result = await socialLink.save();
    await UsersModel.findOneAndUpdate(
      {},
      { $push: { socialLinks: socialLink._id } }
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
}
