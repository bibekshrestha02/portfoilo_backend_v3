import { Router } from 'express';
import {
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from '../controller/socialLinkController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const Route = Router();

Route.post('/', [verifyToken, createSocialLink]);
Route.put('/:id', [verifyToken, updateSocialLink]);
Route.delete('/:id', [verifyToken, deleteSocialLink]);

export default Route;
