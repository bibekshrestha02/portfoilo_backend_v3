import { Application } from 'express';
const route = (app: Application) => {
  app.get('/', (req, res) => {
    res.send('hellow');
  });
};

export default route;
