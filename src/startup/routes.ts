import { Application } from 'express';
import initalRoute from '../route/initialRoute';
import socialLinkRoute from '../route/socialLinkRoute';
const route = (app: Application) => {
  app.use('/api/v1', initalRoute);
  app.use('/api/v1/socialLink', socialLinkRoute);
};

export default route;
