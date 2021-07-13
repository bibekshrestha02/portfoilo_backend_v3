import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateContact } from '../model/usersModel';
import asyncHandler from 'express-async-handler';

export const editContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateContact.validate(req.body);
    let { title, detail, subDetail, email } = req.body;
    const result = await UserModel.findOneAndUpdate(
      {},
      {
        'contact.title': title,
        'contact.detail': detail,
        'contact.subDetail': subDetail,
        'contact.email': email,
      },
      {
        new: true,
      }
    )
      .select('contact')
      .lean();
    res.status(200).json(result.contact);
  }
);

export const getContact = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserModel.findOne({}).select('contact').lean();
    res.status(200).json(result.contact);
  }
);
