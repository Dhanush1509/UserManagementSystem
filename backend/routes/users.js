import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserDetails,
  updateUserDetails,
  deleteUserDetails,
} from "../controllers/userController.js";
import protect from "../middlewares/setAuthToken.js";
router.post("/login", loginUser);
router.post("/register", registerUser);
router
  .route("/profile/:id")
  .get(protect, getUserDetails)
  .put(protect, updateUserDetails)
  .delete(protect, deleteUserDetails)

export default router;
