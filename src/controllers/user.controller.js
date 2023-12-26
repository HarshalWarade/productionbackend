import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Harshal Warade" });
});

const displayMsg = asyncHandler(async (req, res) => {
  res.status(200).send("This is a msg to display!");
});

export { registerUser, displayMsg };
