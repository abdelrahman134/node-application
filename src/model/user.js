const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const validator=require('validator')
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    
  },
  email: {
    type: String,
    unique: true,
    required: true,
    
  },
  role: {
    type: String,
    enum: ["Employees", "Managers", "Admins"],
    required: true,
  },

  lastLogin: {
    type: Date,
    default: Date.now,
  },
});
const User=mongoose.model('User',userSchema)
module.exports=User