import { Router } from 'express';
import { getInital } from '../controller/initialController';
const Route = Router();
Route.get('/', getInital);
export default Route;
