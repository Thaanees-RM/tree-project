import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName : {type:String, required:true},
  lastName : {type:String, required:true},
  email : {type:String, required:true},
  tree:      { type: String, required: true },
  location:  { type: String, required: true },
  acceptedTerms: { type: Boolean, required: true },
  subscribe:     { type: Boolean, default: false },
  imagePath:     { type: String },  // path to uploaded image file
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

const User = mongoose.model('User', userSchema);

export default User;