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
   .put(protect, updateUserDetails)
   .delete(protect, deleteUserDetails);
router
  .route("/profiles")
  .get(protect, getUserDetails)
 

export default router;
