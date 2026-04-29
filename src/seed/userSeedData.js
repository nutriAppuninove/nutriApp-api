require("dotenv").config();

const AppDataSource = require("../lib/dataSource");
const { Analise } = require("../entities/Analise");

const seed = async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Analise);

  const mockData = [];

  for (let i = 0; i < 3000; i++) {
    mockData.push({
      peso: Number((Math.random() * 40 + 50).toFixed(1)),
      altura: Number((Math.random() * 30 + 150).toFixed(1)),
      idade: Math.floor(Math.random() * 40) + 18,
      frequencia: Math.floor(Math.random() * 7) + 1,
    });
  }

  await repo.save(mockData);

  console.log("Seed concluído com 3000 registros!");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
