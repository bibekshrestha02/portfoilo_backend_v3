import { Response, Request, NextFunction } from 'express';
import ColorModel from '../model/colorModel';
import catchAsync from 'express-async-handler';

export const createColor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('hellow Fomr COlor');
  }
);
