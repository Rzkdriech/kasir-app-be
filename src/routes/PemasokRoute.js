import express from "express";

import { gPemasok, cPemasok } from "../controllers/Pemasok.js";

import { verifyUser, adminOnly } from "../middleware/Auth.js";

const router = express.Router();

router.get("/kasir/suppliers",verifyUser ,gPemasok);
router.get("/kasir/supplier/:id",verifyUser);
router.post("/kasir/supplier",verifyUser ,cPemasok);


export default router;
