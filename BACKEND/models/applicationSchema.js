import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Your Name!"],
    minLength: [3, "Name must contain 3 at least 3 Character!"],
    maxLenght: [30, "Name cannot exceed 30 character!"],
  },
  email: {
    type: String,
    validator: [validator.isEmail, "Please Provide a valid emai"],
    required: [true, "Please Provide your Gmail"],
  },
  prn: {
    type: Number,
    required: [true, "Please provide PRN Number"],
    minLength: [10, "Please Provide 10 digits PRN Number"],
  },
  course: {
    type: String,
    required: [true, "Please Provide Your Course Name"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please Provide your cover letter"],
  },
  phone: {
    type: Number,
    required: [true, "Please Provide your Phone Number"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Student"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["TPO"],
      required: true,
    },
  },
});
export const Application = mongoose.model("Application", applicationSchema);
