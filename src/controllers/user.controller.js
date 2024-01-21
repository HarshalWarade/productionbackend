import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiReference.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user data from the frontend
  // validation (!empty)
  // check if user already exists: using username and email
  // check if avatar is there or not, bcz it is compulsory
  // if there's an avatar, upload it on cloudinary
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } =
    req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Full Name is required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if(existedUser) {
    throw new ApiError(409, "User with email or username already exists!")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required, please add an avatar!")
  }
  
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath) 
  
  if(!thisAvatar) {
    throw new ApiError(400, "Avatar file is required, please add an avatar!")
  }

  const user = await User.create({
    fullName, 
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email, 
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user!")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully!")
  )

});

const displayMsg = asyncHandler(async (req, res) => {
  res.status(200).send("This is a msg to display!");
});

export { registerUser, displayMsg };
