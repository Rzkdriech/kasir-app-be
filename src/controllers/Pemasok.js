import { prisma } from "../database/db.js";

export const gPemasok = async(_, res) => {
  try {
    const response = await prisma.pemasok.findMany()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const cPemasok = async(req, res) => {
  const newPemasok = req.body;

  const isExists = await prisma.pemasok.findFirst({
    where: {
      NAMA_PEMASOK: newPemasok.NAMA_PEMASOK
    }
  })

  if(isExists) return res.status(400).json({ msg: "user is exists" })

  try {
    const pemasok = await prisma.pemasok.create({
      data: {
        NAMA_PEMASOK: newPemasok.NAMA_PEMASOK,
        ALAMAT: newPemasok.ALAMAT,
        NOMOR_TELEPON: newPemasok.NOMOR_TELEPON
      } 
    })
    res.status(201).json({ msg: "data created", data: pemasok })
  } catch (error) {
    res.status(500).json({ msg: error.message }) 
  }
}
