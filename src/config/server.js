const express = require("express");
const router = require("../routes/index");
require("dotenv").config();

const connectToDatabase = require("../database/connect");

connectToDatabase();

const server = express();

server.use(express.json());

server.use(router);

module.exports = server;
