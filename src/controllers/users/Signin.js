const UserModel = require("../../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signin = async  (req, res) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exist
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: user._id }, secret);

    res.status(200).json({ msg: "Usuário logado com sucesso!", token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = Signin