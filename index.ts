import * as dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

import app from './app';

console.log(process.env.DATABASE_PASSWORD);
const port = 3000;

app.get('/', (req, res) => {
  res.send('hello there ...');
});

const DB = process.env.DATABASE_URL?.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD as string
);

connect(DB as string).then(() => {
  console.log('Connection erfolg');
});

app.listen(port, () => {
  console.log(`form ${port}`);
});
