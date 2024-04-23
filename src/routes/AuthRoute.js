import express from "express";
import { Login, Me, Register, Logout } from "../controllers/Auth.js";
import { adminOnly } from "../middleware/Auth.js";

const router = express.Router();

router.get("/kasir/me", Me);
router.post("/kasir/login", Login);
router.post("/kasir/register",adminOnly, Register);
router.get("/kasir/logout", Logout);

export default router;
