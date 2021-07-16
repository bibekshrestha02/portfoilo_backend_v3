import { Router } from 'express';
import { editContact, getContact } from '../controller/contactController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();

Route.get('/', [verifyToken, getContact]);

Route.put('/', [verifyToken, editContact]);

export default Route;
