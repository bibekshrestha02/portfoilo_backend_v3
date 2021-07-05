import express, { Application, Response, Request } from 'express';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hellow');
});
let port = 5000;
app.listen(port, () => {
  console.log('Server started');
});
