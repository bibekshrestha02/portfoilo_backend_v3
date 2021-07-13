import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateAbout } from '../model/usersModel';
import asyncHandler from 'express-async-handler';
export const editAbout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateAbout.validate(req.body);
    let { title, subTitle, cvPath, description } = req.body;
    const result = await UserModel.findOneAndUpdate(
      {},
      {
        'about.title': title,
        'about.subTitle': subTitle,
        'about.cvPath': cvPath,
        'about.description': description,
      },
      {
        new: true,
      }
    )
      .select('about')
      .lean();
    res.status(200).json(result.about);
  }
);

export const getAbout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserModel.findOne({}).select('about').lean();
    res.status(200).json(result.about);
  }
);
