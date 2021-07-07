import { Schema, model } from 'mongoose';
export const colorSchema = new Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});
const colorModel = model('Color', colorSchema);
export default colorModel;
