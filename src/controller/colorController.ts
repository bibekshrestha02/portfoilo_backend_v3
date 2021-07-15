import { Response, Request, NextFunction } from 'express';
import catchAsync from 'express-async-handler';
import { getNameAndValue } from '../utils/getNameAndValue';
import ColorModel from '../model/colorModel';
import { validateColor } from '../model/colorModel';

export const getColors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let result = await ColorModel.find({}).lean();
    result = getNameAndValue(result);
    res.status(200).json(result);
  }
);

export const createColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await validateColor.validate(req.body);

    const { name, value } = req.body;
    let result = await ColorModel.findOne({ name });
    if (result)
      return res.status(400).json({
        name: 'Validation Error',
        message: 'Color Name is already taken',
      });

    result = await ColorModel.create({ name, value });
    result = getNameAndValue(result);
    res.status(201).json(result);
  }
);

export const updateColors = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    let result = await ColorModel.findOne({ name });
    if (!result) {
      return res.status(400).json({ message: 'Invalid Name' });
    }
    await validateColor.validate({ name, value: req.body.value });

    result = await ColorModel.findOneAndUpdate(
      { name },
      { value: req.body.value },
      { new: true }
    );

    res.status(200).json(result);
  }
);

export const deleteColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    let result = await ColorModel.findOne({ name });
    if (!result) {
      return res.status(400).json({ message: 'Invalid Name' });
    }
    await ColorModel.findOneAndDelete({ name });

    res.status(200).json({ message: 'Successfully Deleted' });
  }
);
