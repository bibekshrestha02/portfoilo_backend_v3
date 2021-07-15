import { Router } from 'express';
import {
  addSkill,
  editTitle,
  editSkill,
  deleteSkill,
  getAllSkill,
  getSkill,
} from '../controller/skillController';
const Route = Router();
Route.get('/', getSkill);
Route.get('/all', getAllSkill);
Route.put('/title', editTitle);
Route.post('/', addSkill);
Route.put('/:id', editSkill);
Route.delete('/:id', deleteSkill);
export default Route;
