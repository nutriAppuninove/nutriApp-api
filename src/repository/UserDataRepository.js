const AppDataSource = require("../lib/dataSource");
const { UserData } = require("../entities/UserData");

const getRepo = () => AppDataSource.getRepository(UserData);

const save = async (data) => {
  return await getRepo().save(data);
};

const findLatest = async () => {
  return await getRepo().findOne({
    order: { createdAt: "DESC" },
  });
};

module.exports = { save, findLatest };
