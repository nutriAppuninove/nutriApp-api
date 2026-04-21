const { EntitySchema } = require("typeorm");
const { UUID } = require("typeorm/driver/mongodb/bson.typings.js");

module.exports.UserData = new EntitySchema({
  name: "UserData",
  tableName: "user_data",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },
    peso: { type: "float" },
    altura: { type: "float" },
    pesoAlvo: { type: "float" },
    createdAt: { type: Date, createDate: true },
  },
});
