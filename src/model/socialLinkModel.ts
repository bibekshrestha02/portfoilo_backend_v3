import { Schema, model } from 'mongoose';
export const socialLinkSchema = new Schema({
  name: {
    type: String,
  },
  iconPath: {
    type: String,
  },
  link: {
    type: String,
  },
});
const socialLinkModel = model('SocialLink', socialLinkSchema);
export default socialLinkModel;
