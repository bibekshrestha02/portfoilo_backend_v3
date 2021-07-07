import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  profileImagePath: {
    type: String,
  },
  about: {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    cvPath: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  education: {
    title: {
      type: String,
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Education',
    },
  },
  project: {
    title: {
      type: String,
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
    },
  },
  skill: {
    title: {
      type: String,
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Skill',
    },
  },
  contact: {
    title: {
      type: String,
    },
    detail: {
      type: String,
    },
    subDetail: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  socialLinks: {
    type: [Schema.Types.ObjectId],
    ref: 'SocailLink',
  },
});

const UserModel = model('User', userSchema);
export default UserModel;
