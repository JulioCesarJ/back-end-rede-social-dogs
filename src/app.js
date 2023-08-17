require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();


connectToDatabase();

const port = 3000;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
