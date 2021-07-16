import { Router } from 'express';
import {
  addSkill,
  editTitle,
  editSkill,
  deleteSkill,
  getAllSkill,
  getSkill,
} from '../controller/skillController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();
Route.get('/', getSkill);
Route.get('/all', getAllSkill);
Route.put('/title', [verifyToken, editTitle]);
Route.post('/', [verifyToken, addSkill]);
Route.put('/:id', [verifyToken, editSkill]);
Route.delete('/:id', [verifyToken, deleteSkill]);
export default Route;
