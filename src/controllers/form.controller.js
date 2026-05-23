const { DataUserDto } = require("../dto/dataUserDto");
const analiseService = require("../services/analise.service");

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
    return res.status(400).json({
      message:
        "peso, altura e idade são obrigatórios e devem ser números válidos",
    });
  }

  await analiseService.salvarSubmissao(dto);
  res.status(200).json({ message: "Dados recebidos com sucesso", data: dto });
};

const getResult = async (req, res) => {
  const lastSubmission = analiseService.getLastSubmission();

  if (!lastSubmission) {
    return res
      .status(404)
      .json({ message: "Nenhum dado encontrado. Envie os dados primeiro." });
  }

  try {
    const resultado = await analiseService.calcularResultado(
      lastSubmission.userId,
      lastSubmission,
    );
    res.status(200).json(resultado);
  } catch (e) {
    console.error("Erro ao calcular resultado:", e);
    res.status(500).json({ message: "Erro ao calcular resultado" });
  }
};

module.exports = { submit, getResult };
