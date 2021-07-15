import { Router } from 'express';
import {
  createColor,
  deleteColor,
  getColors,
  updateColors,
} from '../controller/colorController';

const Route = Router();
Route.get('/', getColors);
Route.post('/', createColor);
Route.put('/:name', updateColors);
Route.delete('/:name', deleteColor);

export default Route;
