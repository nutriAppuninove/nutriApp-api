require("dotenv").config();

const AppDataSource = require("../lib/dataSource");
const { User } = require("../entities/User");
const { Analise } = require("../entities/Analise");

const usuarios = [
  { nome: "Lucas Oliveira", email: "lucas@email.com", senha: "123456", idade: 25 },
  { nome: "Ana Paula",      email: "ana@email.com",   senha: "123456", idade: 30 },
  { nome: "Carlos Souza",   email: "carlos@email.com", senha: "123456", idade: 22 },
];

const aleatorio = (min, max, casas = 1) =>
  Number((Math.random() * (max - min) + min).toFixed(casas));

const seed = async () => {
  await AppDataSource.initialize();

  const userRepo    = AppDataSource.getRepository(User);
  const analiseRepo = AppDataSource.getRepository(Analise);

  await AppDataSource.query(`TRUNCATE TABLE analises, users CASCADE`);
  console.log("Tabelas limpas.");

  // Cria usuários
  const usuariosSalvos = [];
  for (const dados of usuarios) {
    // Evita duplicata caso a seed rode sem limpar
    let user = await userRepo.findOne({ where: { email: dados.email } });
    if (!user) {
      user = await userRepo.save(dados);
      console.log(`Usuário criado: ${user.nome} (${user.id})`);
    }
    usuariosSalvos.push(user);
  }

  // Cria 10 análises por usuário
  const analises = [];
  for (const user of usuariosSalvos) {
    for (let i = 0; i < 10; i++) {
      analises.push({
        peso:      aleatorio(50, 120),
        altura:    aleatorio(1.50, 1.95, 2),
        idade:     user.idade ?? aleatorio(18, 60, 0),
        frequencia: Math.floor(Math.random() * 7) + 1,
        userId:    user.id,
      });
    }
  }

  await analiseRepo.save(analises);
  console.log(`Seed concluído: ${usuariosSalvos.length} usuários e ${analises.length} análises criadas.`);

  process.exit(0);
};

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
