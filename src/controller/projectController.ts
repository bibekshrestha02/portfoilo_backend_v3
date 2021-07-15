import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import { validateTitle } from '../model/usersModel';
import asyncHandler from 'express-async-handler';
import ProjectModel from '../model/projectModel';
import { validateProject } from '../model/projectModel';
import { isValidObjectId } from 'mongoose';

export const getProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserModel.findOne({})
      .select('project')
      .populate('project.data')
      .lean();
    res.status(200).json(result.project);
  }
);

export const editTitle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);
export const getAllProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let project = await ProjectModel.find({});
    res.status(200).json(project);
  }
);
export const addProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateProject.validate(req.body);
    const { name, iconPath, link } = req.body;

    let project = new ProjectModel({ name, iconPath, link });

    await UserModel.findOneAndUpdate(
      {},
      { $push: { 'project.data': project._id } }
    );

    project = await project.save();
    res.status(201).json(project);
  }
);

export const editProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });
    let { id } = req.params;
    let result = await ProjectModel.findById(id);
    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await validateProject.validate(req.body);

    const { name, iconPath, link } = req.body;

    result = await ProjectModel.findByIdAndUpdate(
      id,
      { name, iconPath, link },
      { new: true }
    ).lean();

    res.status(200).json(result);
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!isValidObjectId)
      return res.status(400).json({ message: 'Invalid Id' });

    let { id } = req.params;

    let result = await ProjectModel.findById(id);

    if (!result) return res.status(400).json({ message: 'Invalid Id' });

    await ProjectModel.findByIdAndDelete(id);

    res.status(200).json({
      messsage: 'Successfully Deleted',
    });
  }
);
