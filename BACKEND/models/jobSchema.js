import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Title must contain at least 3 character"],
    maxLength: [50, "Title cannot exceed 50 character "],
  },
  description: {
    type: String,
    required: [true, "Please provide placement drive description"],
    minLength: [10, "Description must contain at least 10 character"],
    maxLength: [350, "Description cannot exceed 350 character "],
  },
  category: {
    type: String,
    required: [true, "job Category is required!"],
  },
  eligible: {
    type: String,
    required: [true, "couruses is required!"],
  },
  state: {
    type: String,
    required: [true, "Job location required!! "],
  },
  city: {
    type: String,
    required: [true, "job city is required !!"],
  },
  location: {
    type: String,
    required: [true, "Please Provide exact location"],
    minLength: [10, "job loaction conatain at least 10 characters !!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed salary must contain at least 4 digits!!"],
    maxLength: [9, "Fixed salary cannot exceed 9 digits!"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits"],
    maxLength: [9, "Salary cannot exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
