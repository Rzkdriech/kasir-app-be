import { prisma } from "../database/db.js";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findMany({
      where: {
        Username: username,
        Password: password,
      },
    });

    if (user.length === 1) {
      req.session.username = user[0].Username;
      console.log(req.session.username);
      res.send(`${req.session.username} logged in`);
    } else {
      return res.status(401).json({ msg: "Authentication failed" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const Me = async(req, res) => {
  if (!req.session.username) {
    return res.status(404).json({ msg: "Mohon login"})
  }

  const user = await prisma.user.findMany({
    where: {
      Username: req.session.username
    }
  })

  if (user.length == 0) return res.status(404).json({ msg: "failed" })
  res.status(200).json({user})

}
