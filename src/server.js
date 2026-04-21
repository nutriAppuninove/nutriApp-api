require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AppDataSource = require("./lib/dataSource");
const routes = require("./routes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
  });
