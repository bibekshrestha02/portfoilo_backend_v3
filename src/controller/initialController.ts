import { Response, Request, NextFunction } from 'express';
import ColorModel from '../model/colorModel';
import UserModel from '../model/usersModel';
import { validateName, validateProfileImagePath } from '../model/usersModel';

export async function getInital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Find the document
    const query = {},
      update = {
        isCreate: 'true',
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    let user = await UserModel.findOneAndUpdate(
      query,
      update,
      options,
      async function (error: any, result: any) {
        if (error) return;
        if (!result) {
          await UserModel.create({});
        }
      }
    )
      .select('name title profileImagePath socialLinks')
      .populate('socialLinks')
      .lean();
    let colors = await ColorModel.find({}).lean();

    res.json({ ...user, colors });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

export async function updateName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await validateName.validate(req.body);
    const { name, title } = req.body;
    let result = new UserModel({ name, title });
    result = await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function updateProfileImagePath(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await validateProfileImagePath.validate(req.body);
    let result = new UserModel({ profileImagePath: req.body.profileImagePath });
    result = await result.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error);
  }
}
