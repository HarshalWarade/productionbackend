import { Router } from "express";
import { registerUser, displayMsg } from "../controllers/user.controller.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/msg").get(displayMsg);

export default router;
