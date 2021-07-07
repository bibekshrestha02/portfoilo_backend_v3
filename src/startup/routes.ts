import { Application } from 'express';
import initalRoute from '../route/initialRoute';
const route = (app: Application) => {
  app.use('/api/v1', initalRoute);
};

export default route;
