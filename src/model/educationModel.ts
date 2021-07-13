import { Schema, model } from 'mongoose';
import * as yup from 'yup';
export const educationSchema = new Schema({
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  branch: {
    type: String,
  },
  year: {
    type: Number,
    default: 0,
  },
});
const EducationModel = model('Education', educationSchema);

export const validateEducation = yup.object({
  name: yup.string().required(),
  place: yup.string().required(),
  branch: yup.string().required(),
  year: yup.number(),
});
export default EducationModel;
