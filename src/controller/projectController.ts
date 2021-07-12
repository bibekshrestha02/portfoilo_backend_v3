import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
export const editTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateTitle.validate(req.body);
    const result = await UserModel.findOneAndUpdate(
      {},
      { 'project.title': req.body.title },
      {
        new: true,
      }
    )
      .select('project')
      .lean();

    res.status(200).json({ title: result.project.title });
  } catch (error) {
    res.status(400).send(error);
  }
};
