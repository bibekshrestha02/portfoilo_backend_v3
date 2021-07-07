import express, { Application } from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
import run from './startup/db';
import routes from './startup/routes';
const app: Application = express();
dotenv.config({ path: '.env' });
app.use(json());

routes(app);
run();

let port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Server started');
});

export default server;
