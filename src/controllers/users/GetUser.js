const getUser = async (req, res) => {
  try {
    res.status(200).send({ msg: "Rota GET" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = getUser