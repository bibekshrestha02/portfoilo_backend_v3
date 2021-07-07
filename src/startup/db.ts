import mongoose from 'mongoose';
function run() {
  let db: string;
  if (process.env.NODE_ENV === 'development') {
    db = process.env.mongo_local as string;
  } else {
    db = process.env.mongo_server as string;
  }
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));
}
export default run;
