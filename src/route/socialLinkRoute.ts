import { Router } from 'express';
import {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from '../controller/socialLinkController';
const Route = Router();

Route.post('/', createSocialLink);
Route.put('/:id', updateSocialLink);
Route.delete('/:id', deleteSocialLink);

export default Route;
