import { prisma } from "../database/db.js";

export const gProduk = async (_, res) => {
  try {
    const response = await prisma.produk.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const gProdukByParams = async (req, res) => {
  const paramsId = decodeURIComponent(req.params.id);
  try {
    const produk = await prisma.produk.findFirst({
      where: {
        NamaProduk: paramsId,
      },
    });
    res.status(200).json(produk);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const cProduk = async (req, res) => {
  const newProduk = req.body;

  const existData = await prisma.produk.findFirst({
    where: {
      NamaProduk: newProduk.namaProduk,
    },
  });

  if (existData) return res.status(400).json({ msg: "product exists!" });

  try {
    const produk = await prisma.produk.create({
      data: {
        NamaProduk: newProduk.namaProduk,
        Harga: newProduk.harga,
        Stok: newProduk.stok,
      },
    });

    res.status(201).json({ msg: "data created!", data: produk });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const uProduk = async (req, res) => {
  const upProduk = req.body;
  const params = parseInt(req.params.id);

  try {
    const produk = await prisma.produk.update({
      where: {
        ProdukID: params,
      },

      data: {
        NamaProduk: upProduk.namaProduk,
        Harga: upProduk.harga,
        Stok: upProduk.stok,
      },
    });
    res.status(200).json({ msg: "data updated", data: produk });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const dProduk = async (req, res) => {
  const params = parseInt(req.params.id);

  try {
    const produk = await prisma.produk.delete({
      where: {
        ProdukID: params,
      },
    });
    res.status(200).json({ msg: "data deleted", produk });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
