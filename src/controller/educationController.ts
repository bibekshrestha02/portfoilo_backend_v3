import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
import asyncHandler from 'express-async-handler';

export const editTitle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validateTitle.validate(req.body);
      const result = await UserModel.findOneAndUpdate(
        {},
        { 'education.title': req.body.title },
        {
          new: true,
        }
      )
        .select('education')
        .lean();

      res.status(200).json({ title: result.education.title });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
