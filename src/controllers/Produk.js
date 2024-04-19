import { prisma } from "../database/db.js";

export const gProduk = async (_, res) => {
  try {
    const response = await prisma.barang.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const gProdukByParams = async (req, res) => {
  const paramsId = decodeURIComponent(req.params.id);
  try {
    const produk = await prisma.barang.findFirst({
      where: {
        NAMA_BARANG: paramsId,
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
    const produk = await prisma.barang.create({
      data: {
        NAMA_BARANG: newProduk.namaBarang,
        KATEGORI: newProduk.kategori,
        SATUAN: newProduk.satuan,
        HARGA_BELI: newProduk.hargaBeli,
        HARGA_JUAL: newProduk.hargaJual,
        STOK: newProduk.stok,
        KETERANGAN: newProduk.keterangan,
        BARCODE: newProduk.barcode
      },
    });
    res.status(201).json({ msg: "data created!", data: produk });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const cmProduk = async (req, res) => {
  const dataProduk = req.body.dataProduk;

  try {
    const createProduks = await prisma.barang.createMany({
      data: dataProduk,
      skipDuplicates: true
    });
    res.status(201).json({ msg: "data created", data: createProduks });
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
