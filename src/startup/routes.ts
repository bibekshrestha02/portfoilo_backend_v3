import { Application } from 'express';
import initalRoute from '../route/initialRoute';
import socialLinkRoute from '../route/socialLinkRoute';
import aboutRoute from '../route/aboutRoute';
import contactRoute from '../route/contactRoute';
import educationRoute from '../route/educationRoute';
import projectRoute from '../route/projectRoute';
import skillRoute from '../route/skillRoute';
import colorRoute from '../route/colorRoute';
const route = (app: Application) => {
  app.use('/api/v1', initalRoute);
  app.use('/api/v1/socialLink', socialLinkRoute);
  app.use('/api/v1/about', aboutRoute);
  app.use('/api/v1/contact', contactRoute);
  app.use('/api/v1/education', educationRoute);
  app.use('/api/v1/project', projectRoute);
  app.use('/api/v1/skill', skillRoute);
  app.use('/api/v1/color', colorRoute);
};

export default route;
