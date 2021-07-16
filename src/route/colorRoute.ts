import { Router } from 'express';
import {
  createColor,
  deleteColor,
  getColors,
  updateColors,
} from '../controller/colorController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();
Route.get('/', getColors);
Route.post('/', [verifyToken, createColor]);
Route.put('/:name', [verifyToken, updateColors]);
Route.delete('/:name', [verifyToken, deleteColor]);

export default Route;
