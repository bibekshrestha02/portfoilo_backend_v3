import app from './app';
import run from './startup/db';
run();
let port = process.env.PORT || 400;
app.listen(port, () => console.log('Server Started...'));
