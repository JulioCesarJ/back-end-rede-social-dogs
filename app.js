require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// Config JSON response

app.use(express.json());

// Model
const UserModel = require("./models/User.model");

// Open Route
app.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Rota GET" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id, "-password");

    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ msg: "Usuário não encontrado!" });
  }
});

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado" });
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token, secret)
    
    next()
  } catch (error) {
    res.status(400).send({msg: "Token inválido!"});
  }
}

// register user
app.post("/auth/register", async function (req, res) {
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
});

// login User

app.post("/auth/login", async function (req, res) {
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
});

connectToDatabase();

const port = 3000;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
