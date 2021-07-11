import { Router } from 'express';
import {
  getInital,
  updateName,
  updateProfileImagePath,
} from '../controller/initialController';
const Route = Router();
Route.get('/', getInital);
Route.put('/name', updateName);
Route.put('/profileImage', updateProfileImagePath);

export default Route;
