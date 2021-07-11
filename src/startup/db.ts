import mongoose from 'mongoose';
const run = () => {
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
      useFindAndModify: false,
    })
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));
};

export const testRun = () => {
  let db: string = process.env.mongo_local_test as string;

  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(err));
};
export default run;
