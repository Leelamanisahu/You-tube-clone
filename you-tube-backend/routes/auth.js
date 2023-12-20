import express from "express";
import { googleAuth, signin, signup } from "../controller/auth.js";

const router = express.Router();

//Create a User
router.post("/signup", signup);
//sign in
router.post("/signin", signin);
// Google auth
router.post("/google", googleAuth);

export default router;
