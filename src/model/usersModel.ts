import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  isCreate: {
    type: String,
  },
  title: {
    type: String,
    default: '',
  },
  profileImagePath: {
    type: String,
    default: '',
  },
  about: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    cvPath: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  education: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Education',
    },
  },
  project: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
    },
  },
  skill: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: 'Skill',
    },
  },
  contact: {
    title: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
    },
    subDetail: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
  },
  socialLinks: {
    type: [Schema.Types.ObjectId],
    ref: 'SocialLink',
  },
});

const UserModel = model('User', userSchema);
export default UserModel;
