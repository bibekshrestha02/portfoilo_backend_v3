import { Response, Request, NextFunction } from 'express';
import ColorModel from '../model/colorModel';
import UserModel from '../model/usersModel';
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
