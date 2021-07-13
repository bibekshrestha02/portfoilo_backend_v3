import { Schema, model } from 'mongoose';
import * as yup from 'yup';
export const projectSchema = new Schema({
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
const ProjectModel = model('Project', projectSchema);

export const validateProject = yup.object({
  name: yup.string().required(),
  iconPath: yup.string().required(),
  link: yup.string().required(),
});
export default ProjectModel;
