const { EntitySchema } = require("typeorm");

module.exports.UserData = new EntitySchema({
  name: "UserData",
  tableName: "user_data",
  columns: {
    id: { type: "uuid", primary: true, generated: "uuid" },

    peso: { type: "float" },
    altura: { type: "float" },
    idade: { type: "int" },

    quantidadeDeRefeicaoNoDia: { type: "int" },

    isConsomeAlimentosCaloricos: { type: "boolean" },

    pesoAlvo: { type: "float" },

    isPraticaAtividadeFisica: { type: "boolean" },

    objetivo: { type: "varchar" },

    createdAt: { type: Date, createDate: true },
  },
});