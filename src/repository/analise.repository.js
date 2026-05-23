const AppDataSource = require("../lib/dataSource");
const { Analise } = require("../entities/Analise");

const getRepo = () => AppDataSource.getRepository(Analise);

const save = async (data) => {
  return await getRepo().save(data);
};

const buscarContextoUsuario = async (userId) => {
  if (!userId) return null;

  const userRepo = AppDataSource.getRepository("User");
  const analiseRepo = AppDataSource.getRepository("Analise");

  const user = await userRepo.findOne({ where: { id: userId } });

  const analises = await analiseRepo.find({
    where: { user: { id: userId } },
    order: { createdAt: "DESC" },
    take: 10,
  });

  return { user, analises };
};

const findLatest = async (userId = null) => {
  const where = userId ? { userId } : {};
  return await getRepo().findOne({
    where,
    order: { createdAt: "DESC" },
  });
};

const findAllByUser = async (userId) => {
  return await getRepo().find({
    where: { userId },
    order: { createdAt: "DESC" },
  });
};

module.exports = { save, findLatest, findAllByUser, buscarContextoUsuario };
