const { EntitySchema } = require("typeorm");

module.exports.Analise = new EntitySchema({
  name: "Analise",
  tableName: "analises",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },

    peso: { type: "float" },
    altura: { type: "float" },
    idade: { type: "int" },
    frequencia: { type: "int", nullable: true },

    userId: { type: "uuid", nullable: true },

    createdAt: { type: Date, createDate: true },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" },
      onDelete: "CASCADE",
      nullable: true,
    },
  },
});
