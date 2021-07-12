import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateAbout } from '../model/usersModel';

export const editAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    res.status(400).send(error);
  }
};
