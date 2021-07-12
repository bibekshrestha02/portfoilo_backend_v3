import { Router } from 'express';
import { editAbout, getAbout } from '../controller/aboutController';
const Route = Router();

Route.get('/', getAbout);

Route.put('/', editAbout);

export default Route;
