import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
export const catchError = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send(error);
};
