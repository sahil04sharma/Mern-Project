const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  photo: { type: String, required: true }, 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  newPassword: { type: String }, 

  name: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date, required: true }, 

  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  customGender: { type: String }, 

  profession: { type: String, required: true, enum: ['Student', 'Developer', 'Entrepreneur'] },
  companyName: { type: String }, 

  address1: { type: String, required: true },

  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },

  subscriptionPlan: { type: String, enum: ['Basic', 'Pro', 'Enterprise'], required: true },
  newsletter: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', UserSchema);
