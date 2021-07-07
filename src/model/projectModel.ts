import { Schema, model } from 'mongoose';
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
export default ProjectModel;
