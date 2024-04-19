import { prisma } from "../database/db.js";

export const verifyUser = async (req, res, next) => {
  try {
    console.log(req.session);
    if (!req.session.username) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    const users = await prisma.user.findFirst({
      where: {
        Username: req.session.username,
      },
    });

    if (users) {
      req.user = users[0];
      next();
    }

    return res.status(401).json({ msg: "unauthorized" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
