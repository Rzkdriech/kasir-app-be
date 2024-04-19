import express from "express";
import { Login, Me } from "../controllers/Auth.js";

const router = express.Router();

router.get("/kasir/me", Me);
router.post("/kasir/login", Login);

export default router;
