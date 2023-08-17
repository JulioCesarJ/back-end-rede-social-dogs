const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@projeto-dogs.s6h7ej2.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Conexao com banco de dados realizada com sucesso!");
  } catch (error) {
    console.log("Erro de conexão com o banco de dados: ", error);
  }
};

module.exports = connectToDatabase;
