import { Router } from 'express';
import { login } from '../controller/authController';
const Route = Router();

Route.get('/', login);

export default Route;
