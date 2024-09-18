import { model, Schema } from 'mongoose';

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

export default Tour;
