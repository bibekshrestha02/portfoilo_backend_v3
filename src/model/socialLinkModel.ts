import { Schema, model } from 'mongoose';
import * as yup from 'yup';
const socialLinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconPath: {
    required: true,
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
});
export const socialLinkValidationSchema = yup.object().shape({
  name: yup.string().required(),
  iconPath: yup.string().required(),
  link: yup.string().required(),
});

const socialLinkModel = model('SocialLink', socialLinkSchema);
export default socialLinkModel;
