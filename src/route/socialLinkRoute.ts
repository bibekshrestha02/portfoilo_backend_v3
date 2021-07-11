import { Router } from 'express';
import {
  createSocialLink,
  updateSocialLink,
} from '../controller/socialLinkController';
const Route = Router();

Route.post('/', createSocialLink);
Route.put('/:id', updateSocialLink);
export default Route;
