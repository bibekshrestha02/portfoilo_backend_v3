import { Application } from 'express';
import initalRoute from '../route/initialRoute';
import socialLinkRoute from '../route/socialLinkRoute';
import aboutRoute from '../route/aboutRoute';
import contactRoute from '../route/contactRoute';

const route = (app: Application) => {
  app.use('/api/v1', initalRoute);
  app.use('/api/v1/socialLink', socialLinkRoute);
  app.use('/api/v1/about', aboutRoute);
  app.use('/api/v1/contact', contactRoute);
};

export default route;
