import { Router } from 'express';
import { editAbout, getAbout } from '../controller/aboutController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();

Route.get('/', getAbout);

Route.put('/', [verifyToken, editAbout]);

export default Route;
