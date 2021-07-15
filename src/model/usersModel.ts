import { Schema, model } from 'mongoose';
import socialLinkModel from './socialLinkModel';
import educationModel from './educationModel';
import projectModel from './projectModel';
import skillModel from './skillModel';

import * as yup from 'yup';
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
      ref: educationModel,
    },
  },
  project: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: projectModel,
    },
  },
  skill: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: [Schema.Types.ObjectId],
      ref: skillModel,
    },
  },
  contact: {
    title: {
      type: String,
      default: '',
    },
    detail: {
      type: String,
      default: '',
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
    ref: socialLinkModel,
  },
});

const UserModel = model('User', userSchema);

export default UserModel;

// name validation
export const validateName = yup.object({
  name: yup.string().required(),
  title: yup.string().required(),
});

// profileImagePath Validation
export const validateProfileImagePath = yup.object({
  profileImagePath: yup.string().required(),
});

// About fields Validation
export const validateAbout = yup.object({
  title: yup.string().required(),
  subTitle: yup.string().required(),
  cvPath: yup.string().required(),
  description: yup.string().required(),
});

// Contact fields validation
export const validateContact = yup.object({
  title: yup.string().required(),
  detail: yup.string().required(),
  subDetail: yup.string().required(),
  email: yup.string().email().required(),
});

// Edit title
export const validateTitle = yup.object({
  title: yup.string().required(),
});
