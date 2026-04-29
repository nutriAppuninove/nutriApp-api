const AppDataSource = require("../lib/dataSource");
const { Analise } = require("../entities/Analise");

const getRepo = () => AppDataSource.getRepository(Analise);

const save = async (data) => {
  return await getRepo().save(data);
};

const findLatest = async (userId = null) => {
  const where = userId ? { user: { id: userId } } : {};
  return await getRepo().findOne({
    where,
    order: { createdAt: "DESC" },
    relations: ["user"],
  });
};

const findAllByUser = async (userId) => {
  return await getRepo().find({
    where: { user: { id: userId } },
    order: { createdAt: "DESC" },
  });
};

module.exports = { save, findLatest, findAllByUser };
