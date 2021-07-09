import express, { Application } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import routes from './startup/routes';
const app: Application = express();
dotenv.config({ path: '.env' });
app.use(json());
routes(app);
export default app;
