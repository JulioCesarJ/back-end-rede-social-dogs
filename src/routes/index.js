const express =  require('express');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Rota GET" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router