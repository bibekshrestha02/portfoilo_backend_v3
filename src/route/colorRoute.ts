import { Router } from 'express';
import { createColor } from '../controller/colorController';

const Route = Router();

Route.get('/', createColor);

export default Route;
