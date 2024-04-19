import express from "express";

import {
  gProduk,
  gProdukByParams,
  cProduk,
  cmProduk,
  uProduk,
  dProduk,
} from "../controllers/Produk.js";

const router = express.Router();

router.get("/kasir/products", gProduk);
router.get("/kasir/product/:id", gProdukByParams);
router.post("/kasir/product", cProduk);
router.post("/kasir/products", cmProduk);
router.patch("/kasir/product/:id", uProduk);
router.delete("/kasir/product/:id", dProduk);

export default router;
