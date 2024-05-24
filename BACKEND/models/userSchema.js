import mongoose from "mongoose";
import validator from "validator";
import bcryt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide your Name!"],
    minLength: [3, "Name Must contain at least 3 character!"],
    maxLenghth: [50, "Name cannot exceed  50 character!"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your Email!"],
    validate: [validator.isEmail, "Please Provide a valid email"],
  },
  prn: {
    type: Number,
    required: [true, "Please Provide your Prn Number"],
    // validate: [validator.isNumeric, "Please Provide Valid PRN Number"],
    minLength: [10, "PRN must be 10 digit"],
  },

  phone: {
    type: Number,
    required: [true, "Please Provide your Phone Number"],
  },
  password: {
    type: String,
    required: [true, "Please Provide your Password"],
    minLength: [8, "Pasword Should contain at 8 Character"],
    maxLenghth: [32, "Password cannot exceed  32 character!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please Provide Your Role"],
    enum: ["Student", "TPO"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hashing The password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryt.hash(this.password, 10);
});

//COMPARING PASSWORD
userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcryt.compare(enterdPassword, this.password);
};

//generating a jwt  token for authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
