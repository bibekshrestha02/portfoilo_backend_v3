import { Router } from 'express';
import {
  getInital,
  updateName,
  updateProfileImagePath,
} from '../controller/initialController';
import verifyToken from '../middleware/verifyTokenMiddleware';
const Route = Router();
Route.get('/', getInital);
Route.put('/name', [verifyToken, updateName]);
Route.put('/profileImage', [verifyToken, updateProfileImagePath]);

export default Route;
