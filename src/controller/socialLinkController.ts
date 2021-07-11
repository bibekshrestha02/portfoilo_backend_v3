import { Response, Request, NextFunction } from 'express';
import { socialLinkValidationSchema } from '../model/socialLinkModel';
import SocialLinkModel from '../model/socialLinkModel';
import UsersModel from '../model/usersModel';
import { isValidObjectId } from 'mongoose';
import UserModel from '../model/usersModel';

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

export async function updateSocialLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ field: 'id', message: 'Invalid Id' });
    let { id } = req.params;
    let result = await SocialLinkModel.findById(id).lean();
    if (!result)
      return res.status(400).json({ field: 'id', message: 'Invalid Id' });
    await socialLinkValidationSchema.validate(req.body);
    const { name, link, iconPath } = req.body;

    result = await SocialLinkModel.findByIdAndUpdate(
      id,
      {
        name,
        link,
        iconPath,
      },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteSocialLink(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ field: 'id', message: 'Invalid Id' });
    let { id } = req.params;
    let result = await SocialLinkModel.findById(id).lean();
    if (!result)
      return res.status(400).json({ field: 'id', message: 'Invalid Id' });
    await SocialLinkModel.findByIdAndDelete(id);
    await UserModel.updateOne({}, { $pull: { socialLinks: id } });
    res.status(200).json({
      message: 'Successfully deleted',
    });
  } catch (error) {
    res.status(400).send(error);
  }
}
