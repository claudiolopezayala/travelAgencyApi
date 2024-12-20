import mongoose, { Schema } from "mongoose";

const visitSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
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
  isVerified:{
    type: Boolean,
    default: false
  },
  visit:[visitSchema]
})

export const UserModel = mongoose.model("User", userSchema)