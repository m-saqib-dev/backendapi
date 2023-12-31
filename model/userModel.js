const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    }
},
active: {type: Boolean, default: true}
},
{
    timestamps:true
});
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
   });

const User = mongoose.model('Users', UserSchema);

module.exports = User;
