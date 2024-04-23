import express from "express";

import {
  cPelanggan, 
  gPelanggan
} from "../controllers/Pelanggan.js";

const router = express.Router();

router.get("/kasir/customers", gPelanggan);
router.get("/kasir/product/:id");
router.post("/kasir/customer", cPelanggan);
router.patch("/kasir/product/:id");
router.delete("/kasir/product/:id");

export default router;
