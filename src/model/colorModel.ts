import { Schema, model } from 'mongoose';
import * as yup from 'yup';
export const colorSchema = new Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});
const colorModel = model('Color', colorSchema);

export const validateColor = yup.object({
  name: yup.string().required(),
  value: yup.string().required(),
});
export default colorModel;
