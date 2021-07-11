import { Router } from 'express';
import { createSocialLink } from '../controller/socialLinkContainer';
const Route = Router();

Route.post('/', createSocialLink);

export default Route;
