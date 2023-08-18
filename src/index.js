const server = require("./config/server")

const port = 3000;

server.listen(port, () => console.log(`Rodando com Express na porta ${port}`));
