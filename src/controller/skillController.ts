import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
import asyncHandler from 'express-async-handler';

export const editTitle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateTitle.validate(req.body);
    const result = await UserModel.findOneAndUpdate(
      {},
      { 'skill.title': req.body.title },
      {
        new: true,
      }
    )
      .select('skill')
      .lean();

    res.status(200).json({ title: result.skill.title });
  }
);
