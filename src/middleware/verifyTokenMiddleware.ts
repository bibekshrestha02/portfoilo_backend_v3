import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/usersModel';
import jwt from 'jsonwebtoken';

const verfiyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-auth-token'];
    if (!token) {
      res.status(403).json({
        message: 'who you are? hmm🙄',
      });
    }

    let decoded: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    );

    let result = await UserModel.findById(decoded._id);
    if (!result) {
      res.status(400).json({
        message: 'invalid token',
      });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default verfiyToken;
