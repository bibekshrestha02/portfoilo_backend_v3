import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.json('hellow');
};
