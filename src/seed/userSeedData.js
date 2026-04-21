require("dotenv").config();

const AppDataSource = require("../lib/dataSource");
const { UserData } = require("../entities/UserData");

const objetivos = ["emagrecer", "ganhar_massa", "manter"];

const seed = async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(UserData);

  const mockData = [];

  for (let i = 0; i < 3000; i++) {
    mockData.push({
      peso: Number((Math.random() * 40 + 50).toFixed(1)),
      altura: Number((Math.random() * 30 + 150).toFixed(1)),
      idade: Math.floor(Math.random() * 40) + 18,

      quantidadeDeRefeicaoNoDia: Math.floor(Math.random() * 3) + 3,

      isConsomeAlimentosCaloricos: Math.random() > 0.5,

      pesoAlvo: Number((Math.random() * 40 + 50).toFixed(1)),

      isPraticaAtividadeFisica: Math.random() > 0.5,

      objetivo: objetivos[Math.floor(Math.random() * objetivos.length)],
    });
  }

  await repo.save(mockData);

  console.log("Seed concluído com 100 registros!");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
