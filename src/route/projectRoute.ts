import { Router } from 'express';
import {
  addProject,
  editTitle,
  editProject,
  deleteProject,
  getAllProject,
  getProject,
} from '../controller/projectController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();
Route.get('/', getProject);
Route.get('/all', getAllProject);
Route.put('/title', [verifyToken, editTitle]);
Route.post('/', [verifyToken, addProject]);
Route.put('/:id', [verifyToken, editProject]);
Route.delete('/:id', [verifyToken, deleteProject]);

export default Route;
