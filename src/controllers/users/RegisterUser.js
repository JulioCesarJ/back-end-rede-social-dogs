const UserModel = require("../../models/User.model");
const bcrypt = require("bcrypt");

const Registeruser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    if (!confirmpassword) {
      return res
        .status(422)
        .json({ msg: "A confirmação de senha é obrigatória!" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({ msg: "As senhas não conferem!" });
    }

    // check if user exist
    const userExist = await UserModel.findOne({ email });
    if (userExist)
      return res.status(422).json({ msg: "Usuário já cadastrado" });

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new UserModel({
      name,
      email,
      password: passwordHash,
    });

    await user.save();
    res.status(201).send({ msg: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = Registeruser;
