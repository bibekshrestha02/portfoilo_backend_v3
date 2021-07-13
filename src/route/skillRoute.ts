import { Router } from 'express';
import {
  addSkill,
  editTitle,
  editSkill,
  deleteSkill,
  getAllSkill,
} from '../controller/skillController';
const Route = Router();

Route.get('/all', getAllSkill);
Route.put('/title', editTitle);
Route.post('/', addSkill);
Route.put('/:id', editSkill);
Route.delete('/:id', deleteSkill);
export default Route;
