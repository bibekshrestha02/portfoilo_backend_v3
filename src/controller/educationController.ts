import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
import asyncHandler from 'express-async-handler';
import EducationModel from '../model/educationModel';
import { validateEducation } from '../model/educationModel';
import { isValidObjectId } from 'mongoose';

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

export const getAllEducation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let education = await EducationModel.find({});
    res.status(200).json(education);
  }
);

export const addEducation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateEducation.validate(req.body);
    const { name, place, year, branch } = req.body;

    let education = new EducationModel({ name, place, year, branch });

    await UserModel.findOneAndUpdate(
      {},
      { $push: { 'education.data': education._id } }
    );

    education = await education.save();
    res.status(201).json(education);
  }
);

export const editEducation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });
    let { id } = req.params;
    let result = await EducationModel.findById(id);
    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await validateEducation.validate(req.body);

    const { name, place, year, branch } = req.body;
    result = await EducationModel.findByIdAndUpdate(
      id,
      { name, place, year, branch },
      { new: true }
    ).lean();

    res.status(200).json(result);
  }
);

export const deleteEducation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });

    let { id } = req.params;

    let result = await EducationModel.findById(id);

    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await EducationModel.findByIdAndDelete(id);

    res.status(200).json({
      messsage: 'Successfully Deleted',
    });
  }
);
