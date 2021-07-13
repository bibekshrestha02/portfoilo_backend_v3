import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
import asyncHandler from 'express-async-handler';
import { validateSkill } from '../model/skillModel';
import SkillModel from '../model/skillModel';
import { isValidObjectId } from 'mongoose';

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

export const getAllSkill = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let skill = await SkillModel.find({});
    res.status(200).json(skill);
  }
);

export const addSkill = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateSkill.validate(req.body);
    const { name, iconPath } = req.body;

    let skill = new SkillModel({ name, iconPath });

    await UserModel.findOneAndUpdate(
      {},
      { $push: { 'skill.data': skill._id } }
    );

    skill = await skill.save();
    res.status(201).json(skill);
  }
);

export const editSkill = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });
    let { id } = req.params;
    let result = await SkillModel.findById(id);
    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await validateSkill.validate(req.body);

    const { name, iconPath } = req.body;

    result = await SkillModel.findByIdAndUpdate(
      id,
      { name, iconPath },
      { new: true }
    ).lean();

    res.status(200).json(result);
  }
);

export const deleteSkill = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });

    let { id } = req.params;

    let result = await SkillModel.findById(id);

    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await SkillModel.findByIdAndDelete(id);

    res.status(200).json({
      messsage: 'Successfully Deleted',
    });
  }
);
