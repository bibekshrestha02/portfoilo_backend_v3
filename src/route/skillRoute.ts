import { Router } from 'express';
import { editTitle } from '../controller/skillController';
const Route = Router();

Route.put('/title', editTitle);

export default Route;
