import mongoose, { Schema } from "mongoose";

const visitSchema = new mongoose.Schema({
  type: {
    place: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    }
  }
})

const userSchema = new mongoose.Schema({
  email:{ 
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  verificationToken: {
    type: String,
    required: true,
    unique: true
  },
  varificationTokenExpiration:{
    type: Date,
    required: true
  },
  visit:[visitSchema]
})

export const UserModel = mongoose.model("User", userSchema)