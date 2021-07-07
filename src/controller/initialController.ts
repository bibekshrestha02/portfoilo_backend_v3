import { Response, Request, NextFunction } from 'express';

export function getInital(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    name: 'Bibek',
  });
}
