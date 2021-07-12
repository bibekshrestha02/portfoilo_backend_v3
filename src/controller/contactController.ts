import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateContact } from '../model/usersModel';

export const editContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserModel.findOne({}).select('contact').lean();
    res.status(200).json(result.contact);
  } catch (error) {
    res.status(400).send(error);
  }
};
