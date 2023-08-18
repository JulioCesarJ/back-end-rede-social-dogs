const UserModel = require("../../models/User.model");

const getUser =  async (req, res) => {
  try {
    const authHeader = req.headers["x-access-token"]

    const user = await UserModel.findOne(authHeader, "-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: "Usuário não encontrado!" });
  }
};

module.exports = getUser