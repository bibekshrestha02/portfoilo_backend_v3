import { Router } from 'express';
import { login } from '../controller/authController';
const Route = Router();

Route.get('/:userID/:accessToken', login);

export default Route;
