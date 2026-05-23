require("dotenv").config();

const AppDataSource = require("../lib/dataSource");
const { User } = require("../entities/User");
const { Analise } = require("../entities/Analise");

const aleatorio = (min, max, casas = 1) =>
  Number((Math.random() * (max - min) + min).toFixed(casas));

const nomes = [
  "Lucas",
  "Ana",
  "Carlos",
  "Maria",
  "Pedro",
  "Julia",
  "Rafael",
  "Fernanda",
  "Bruno",
  "Camila",
  "Diego",
  "Larissa",
  "Felipe",
  "Beatriz",
  "Gustavo",
  "Mariana",
  "Thiago",
  "Patricia",
  "Rodrigo",
  "Amanda",
  "Leonardo",
  "Vanessa",
  "Matheus",
  "Gabriela",
  "Andre",
  "Juliana",
  "Ricardo",
  "Renata",
  "Eduardo",
  "Leticia",
];

const sobrenomes = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Lima",
  "Pereira",
  "Costa",
  "Carvalho",
  "Rodrigues",
  "Almeida",
  "Nascimento",
  "Fernandes",
  "Moreira",
  "Barbosa",
  "Rocha",
  "Cunha",
  "Gomes",
  "Martins",
  "Ribeiro",
  "Cavalcanti",
];

const gerarNome = () =>
  `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`;

const gerarEmail = (nome, index) =>
  `${nome
    .toLowerCase()
    .replace(/\s+/g, ".")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")}.${index}@email.com`;

const TOTAL_USUARIOS = 5000;
const ANALISES_POR_USUARIO = 5; // 5000 * 5 = 25000 análises
const BATCH_SIZE = 200;

const seed = async () => {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const analiseRepo = AppDataSource.getRepository(Analise);

  await AppDataSource.query(`TRUNCATE TABLE analises, users CASCADE`);
  console.log("Tabelas limpas.");

  // Cria usuários em batches
  console.log(`Criando ${TOTAL_USUARIOS} usuários...`);
  const usuariosSalvos = [];

  for (let i = 0; i < TOTAL_USUARIOS; i += BATCH_SIZE) {
    const batch = [];
    for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_USUARIOS); j++) {
      const nome = gerarNome();
      const idade = Math.floor(aleatorio(18, 75, 0));
      const pesoAtual = aleatorio(50, 130);
      const pesoAlvo =
        Math.random() > 0.3
          ? Number((pesoAtual + aleatorio(-20, 20)).toFixed(1))
          : null;

      batch.push({
        nome,
        email: gerarEmail(nome, j),
        senha: "123456",
        idade,
        pesoAtual,
        pesoAlvo,
      });
    }

    const salvos = await userRepo.save(batch);
    usuariosSalvos.push(...salvos);
    console.log(`Usuários: ${usuariosSalvos.length}/${TOTAL_USUARIOS}`);
  }

  // Cria análises em batches
  console.log(`Criando análises...`);
  let totalAnalises = 0;

  for (let i = 0; i < usuariosSalvos.length; i += BATCH_SIZE) {
    const analisesBatch = [];
    const usuariosBatch = usuariosSalvos.slice(i, i + BATCH_SIZE);

    for (const user of usuariosBatch) {
      for (let k = 0; k < ANALISES_POR_USUARIO; k++) {
        // peso evolui levemente ao longo dos registros (simula histórico real)
        const variacao = aleatorio(-3, 3);
        const peso = Number(
          (
            (user.pesoAtual ?? 70) +
            variacao * (k / ANALISES_POR_USUARIO)
          ).toFixed(1),
        );

        // data retroativa para simular histórico (até 6 meses atrás)
        const diasAtras = Math.floor(Math.random() * 180);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - diasAtras);

        analisesBatch.push({
          peso,
          altura: aleatorio(1.5, 1.95, 2),
          idade: user.idade ?? aleatorio(18, 75, 0),
          frequencia: Math.floor(Math.random() * 7) + 1,
          userId: user.id,
          createdAt,
        });
      }
    }

    await analiseRepo.save(analisesBatch);
    totalAnalises += analisesBatch.length;
    console.log(
      `Análises: ${totalAnalises}/${TOTAL_USUARIOS * ANALISES_POR_USUARIO}`,
    );
  }

  console.log(`\nSeed concluído!`);
  console.log(`Usuários: ${usuariosSalvos.length}`);
  console.log(`Análises: ${totalAnalises}`);
  process.exit(0);
};

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
