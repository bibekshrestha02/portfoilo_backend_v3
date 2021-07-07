import { Schema, model } from 'mongoose';
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
export default EducationModel;
