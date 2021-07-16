import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';
import asyncHandler from 'express-async-handler';
import UserModel from '../model/usersModel';
import jwt from 'jsonwebtoken';

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userID, accessToken } = req.params;

    if (!userID || !accessToken) {
      return res.status(400).json({ message: 'Invalid Request' });
    }

    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

    let result: any = await fetch(urlGraphFacebook, { method: 'GET' }).then(
      (res) => res.json()
    );
    const { email } = result;
    if (!email) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
    result = await UserModel.findOne({ email });
    if (!result) {
      return res.status(403).json({ message: 'You are not allowed' });
    }
    const token = jwt.sign(
      { _id: result._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({ token });
  }
);
