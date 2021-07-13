import { Schema, model } from 'mongoose';
import * as yup from 'yup';

export const skillSchema = new Schema({
  name: {
    type: String,
  },
  iconPath: {
    type: String,
  },
});

export const validateSkill = yup.object({
  name: yup.string().required(),
  iconPath: yup.string().required(),
});

const SkillModel = model('Skill', skillSchema);
export default SkillModel;
