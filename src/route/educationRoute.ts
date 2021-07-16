import { Router } from 'express';
import {
  addEducation,
  deleteEducation,
  editEducation,
  editTitle,
  getAllEducation,
  getEducation,
} from '../controller/educationController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();
Route.get('/', getEducation);
Route.get('/all', getAllEducation);
Route.put('/title', [verifyToken, editTitle]);
Route.post('/', [verifyToken, addEducation]);
Route.put('/:id', [verifyToken, editEducation]);
Route.delete('/:id', [verifyToken, deleteEducation]);

export default Route;
