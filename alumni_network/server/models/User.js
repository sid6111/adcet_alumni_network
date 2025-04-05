const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  graduationYear: {
    type: Number
  },
  branch: {
    type: String
  },
  role: {
    type: String,
    enum: ['alumni', 'admin'],
    default: 'alumni'
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  currentPosition: {
    type: String
  },
  company: {
    type: String
  },
  skills: {
    type: [String]
  },
  social: {
    linkedin: String,
    twitter: String,
    github: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);