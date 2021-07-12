import { Router } from 'express';
import { editAbout } from '../controller/aboutController';
const Route = Router();

Route.put('/', editAbout);

export default Route;
