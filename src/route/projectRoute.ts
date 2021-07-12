import { Router } from 'express';
import { editTitle } from '../controller/projectController';
const Route = Router();

Route.put('/title', editTitle);

export default Route;
