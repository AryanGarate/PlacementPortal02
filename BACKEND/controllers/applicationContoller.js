import { application } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const employerGetAllAplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Student") {
      return next(
        new ErrorHandler("Student not allowed to access this resource.", 400)
      );
    }

    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const StudentGetAllAplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "TPO") {
      return next(
        new ErrorHandler("TPO is not allowed to access this resource.", 400)
      );
    }

    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const StudentDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "TPO") {
      return next(
        new ErrorHandler("TPO is not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return next(new ErrorHandler("OOPS , Application is not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted SuccessFully !!",
    });
  }
);

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  console.log("aryan\n", req.body, "\non\n", req.files);
  if (role === "TPO") {
    return next(
      new ErrorHandler("TPO is not allowed to access this resource.", 400)
    );
  }

  if (!req.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Resume File is Required"));
  }

  const { resume } = req.files;

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  const { name, email, prn, course, coverLetter, phone, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Student",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const employerID = {
    user: jobDetails.postedBy,
    role: "TPO",
  };
  console.log(
    !name,
    !email,
    !prn,
    !course,
    !coverLetter,
    !phone,
    !applicantID,
    !employerID
  );
  if (
    !name ||
    !email ||
    !prn ||
    !course ||
    !coverLetter ||
    !phone ||
    !applicantID ||
    !employerID
    // !resume
  ) {
    return next(new ErrorHandler("Please Fill all Field", 400));
  }

  const application = await Application.create({
    name,
    email,
    prn,
    course,
    coverLetter,
    phone,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submiited",
    application,
  });
});

// export const StudentDeleteApplication = catchAsyncErrors(
//   async (req, res, next) => {
//     const { role } = req.user;
//     if (role === "TPO") {
//       return next(
//         new ErrorHandler("TPO not allowed to access this resource.", 400)
//       );
//     }
//     const { id } = req.params;
//     const application = await Application.findById(id);
//     if (!application) {
//       return next(new ErrorHandler("Application not found!", 404));
//     }
//     await application.deleteOne();
//     res.status(200).json({
//       success: true,
//       message: "Application Deleted!",
//     });
//   }
// );
