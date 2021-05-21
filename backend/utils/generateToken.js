import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT, { expiresIn: 300 });
};
export default generateToken;
