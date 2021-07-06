import express, { Application, Response, Request } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import db from './startup/db';
import routes from './startup/routes';
const app: Application = express();
dotenv.config({ path: '.env' });
app.use(json());

routes(app);
db();

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server started');
});
