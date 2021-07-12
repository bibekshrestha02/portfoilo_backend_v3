import { Router } from 'express';
import { editContact, getContact } from '../controller/contactController';
const Route = Router();

Route.get('/', getContact);

Route.put('/', editContact);

export default Route;
