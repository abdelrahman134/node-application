const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const noteSchema = new Schema({
  ticket: {
    type: String,
    required: true,
    unique: true,
  },
  titie: {
    type: String,
    required: true,
    trime: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  statuse: {
    type: String,
    enum: ["OPEN", "COMPLETED"],
  },
  assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"

  }
});
const Note=mongoose.model('Note',noteSchema)
module.exports=Note