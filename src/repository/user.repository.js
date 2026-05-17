const AppDataSource = require("../lib/dataSource");
const { User } = require("../entities/User");

const getRepo = () => AppDataSource.getRepository(User);

const save = async (data) => {
  return await getRepo().save(data);
};

const findById = async (id) => {
  return await getRepo().findOne({
    where: { id },
    relations: ["analises"],
  });
};

const findByEmail = async (email) => {
  return await getRepo().findOne({ where: { email } });
};

const findAllByUser = async (userId) => {
  return await getRepo().find({
    where: { id: userId },
    order: { createdAt: "DESC" },
  });
};

module.exports = { save, findById, findByEmail, findAllByUser };
