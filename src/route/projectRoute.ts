import { Router } from 'express';
import {
  addProject,
  editTitle,
  editProject,
  deleteProject,
  getAllProject,
} from '../controller/projectController';
const Route = Router();

Route.get('/all', getAllProject);
Route.put('/title', editTitle);
Route.post('/', addProject);
Route.put('/:id', editProject);
Route.delete('/:id', deleteProject);

export default Route;
