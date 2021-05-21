import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import dotenv from "dotenv";
dotenv.config();

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else if (!(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  }
});
const getUserDetails = asyncHandler(async (req, res) => {
  const { _id, username, email, address } = req.user;

  res.json({
    _id,
    username,
    email,
    address,
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, address } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(401);
    throw new Error("User already exists");
  }
  const userSave = new User({ username, email, password, address });
 const newuser =await userSave.save();
  console.log(newuser)
  res.json({
    _id:newuser._id,
    username,
    email,
    address,
    token: generateToken(newuser._id),
  });
});
const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
  if (req.body.address) {
    user.address = req.body.address;
  }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.status(200).json({ message: "Deletion Successful" });
  } else {
    res.status(400);
    throw new Error("User deletion unsuccessful");
  }
});
export {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
};
