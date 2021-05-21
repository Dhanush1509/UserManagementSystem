import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401);
    throw new Error("Authorisation denied");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401);
    throw new Error("Authorisation denied");
  }
};


export default protect

