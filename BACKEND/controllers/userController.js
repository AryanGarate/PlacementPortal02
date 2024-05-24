import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, prn, phone, role, password } = req.body;

  if (!name || !email || !prn || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill regstration Details"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!"));
  }
  const user = await User.create({
    name,
    email,
    prn,
    phone,
    role,
    password,
  });
  // res.status(200).json({
  //   success: true,
  //   message: "User registerd!",
  //   user,
  // });

  sendToken(user, 200, res, "User Registered Successfully!!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please Provide Email  , password and role.", 404)
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 404));
  }
  const isPasswordMatched = await user.comparePassword(password); //this method is coming from userschema

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("User with his role not Found!", 400));
  }

  sendToken(user, 200, res, "User logged in Successfully!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out succesfully!",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
