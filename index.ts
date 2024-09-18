import * as dotenv from 'dotenv';
import express from 'express';
import { model, Schema, Model, Document, connect } from 'mongoose';

dotenv.config();

console.log(process.env.DATABASE_PASSWORD);
const app = express();
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

interface ITour {
  name?: string;
  rating: number;
  price: number;
}

const toursSchema = new Schema<ITour>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'a tour must have a price'],
  },
});

const Tour = model<ITour>('Tour', toursSchema);

app.listen(port, () => {
  console.log(`form ${port}`);
});
