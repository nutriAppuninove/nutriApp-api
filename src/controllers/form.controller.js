const { DataUserDto } = require("../dto/dataUserDto");
const analiseRepository = require("../repository/analise.repository");

let lastSubmission = null;

// POST /api/insert/post — recebe os dados do formulário da Home
const submit = async (req, res) => {
  let dto;

  try {
    dto = new DataUserDto(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erro ao processar os dados", error: error.message });
  }

  if (dto.peso == null || dto.altura == null || dto.idade == null) {
    return res
      .status(400)
      .json({
        message:
          "peso, altura e idade são obrigatórios e devem ser números válidos",
      });
  }

  lastSubmission = dto;

  const dadosParaSalvar = {
    peso: dto.peso,
    altura: dto.altura,
    idade: dto.idade,
    frequencia: dto.frequencia,
    ...(dto.userId ? { userId: dto.userId, user: { id: dto.userId } } : {}),
  };

  analiseRepository.save(dadosParaSalvar);

  res.status(200).json({ message: "Dados recebidos com sucesso", data: dto });
};

// GET /api/result/get — calcula e retorna o IMC com base nos dados enviados
const getResult = (req, res) => {
  if (!lastSubmission) {
    return res
      .status(404)
      .json({ message: "Nenhum dado encontrado. Envie os dados primeiro." });
  }

  const { peso, altura } = lastSubmission;
  const alturaEmMetros = altura > 10 ? altura / 100 : altura;
  const imc = peso / (alturaEmMetros * alturaEmMetros);

  const classificarIMC = (valor) => {
    if (valor < 18.5) return "Abaixo do peso";
    if (valor < 25) return "Peso normal";
    if (valor < 30) return "Sobrepeso";
    if (valor < 35) return "Obesidade Grau I";
    if (valor < 40) return "Obesidade Grau II";
    return "Obesidade Grau III";
  };

  res.status(200).json({
    imc: {
      valor: parseFloat(imc.toFixed(2)),
      classificacao: classificarIMC(imc),
    },
    dados: lastSubmission,
  });
};

module.exports = { submit, getResult };
