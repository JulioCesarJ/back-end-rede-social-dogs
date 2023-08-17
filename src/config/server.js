import express from 'express';
import "dotenv/config";

const connectToDatabase = require("../database/connect");

connectToDatabase();

const port = 3000;

app.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
