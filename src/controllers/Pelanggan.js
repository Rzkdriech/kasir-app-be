import { prisma } from "../database/db.js";

export const gPelanggan = async (_, res) => {
  try {
    const response = await prisma.pelanggan.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const cPelanggan = async (req, res) => {
  const newPelanggan = req.body;

  const isExist = await prisma.pelanggan.findFirst({
    where: {
      NOMOR_TELEPON: newPelanggan.NOMOR_TELEPON,
    },
  });

  if (isExist) return res.status(404).json({ msg: "pelanggan exists!" });

  try {
    const pelanggan = await prisma.pelanggan.create({
      data: {
        NAMA_PELANGGAN: newPelanggan.NOMOR_TELEPON,
        ALAMAT: newPelanggan.NOMOR_TELEPON,
        NOMOR_TELEPON: newPelanggan.NOMOR_TELEPON,
      },
    });
    res.status(201).json({ msg: "data created", data: pelanggan });
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
};
