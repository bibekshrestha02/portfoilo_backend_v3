import { Schema, model } from 'mongoose';
export const skillSchema = new Schema({
  name: {
    type: String,
  },
  iconPath: {
    type: String,
  },
});
const SkillModel = model('Skill', skillSchema);
export default SkillModel;
