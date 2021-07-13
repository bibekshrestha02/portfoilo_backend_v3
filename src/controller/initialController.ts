import { Response, Request, NextFunction } from 'express';
import ColorModel from '../model/colorModel';
import UserModel from '../model/usersModel';
import { validateName, validateProfileImagePath } from '../model/usersModel';
import asyncHandler from 'express-async-handler';

export const getInital = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export const updateName = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateName.validate(req.body);
    const { name, title } = req.body;
    let result = await UserModel.findOneAndUpdate(
      {},
      {
        name,
        title,
      },
      { new: true }
    )
      .select('name title')
      .lean();

    res.status(200).json(result);
  }
);

export const updateProfileImagePath = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateProfileImagePath.validate(req.body);

    let result = await UserModel.findOneAndUpdate(
      {},
      { profileImagePath: req.body.profileImagePath },
      { new: true }
    )
      .select('profileImagePath')
      .lean();
    res.status(200).json(result);
  }
);
