import { Router } from 'express';
import { editTitle } from '../controller/educationController';
const Route = Router();

Route.put('/title', editTitle);

export default Route;
