const { EntitySchema } = require("typeorm");

module.exports.User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },

    nome: { type: "varchar" },
    email: { type: "varchar", unique: true },
    senha: { type: "varchar" },
    idade: { type: "int", nullable: true },

    createdAt: { type: Date, createDate: true },
  },
  relations: {
    analises: {
      type: "one-to-many",
      target: "Analise",
      inverseSide: "user",
      cascade: true,
    },
  },
});
