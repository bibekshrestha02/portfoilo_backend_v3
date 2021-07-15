import { Router } from 'express';
import {
  addEducation,
  deleteEducation,
  editEducation,
  editTitle,
  getAllEducation,
  getEducation,
} from '../controller/educationController';
const Route = Router();
Route.get('/', getEducation);
Route.get('/all', getAllEducation);
Route.put('/title', editTitle);
Route.post('/', addEducation);
Route.put('/:id', editEducation);
Route.delete('/:id', deleteEducation);

export default Route;
