const { Router } = require("express");
const { DataUserDto } = require("../dto/dataUserDto");
const router = Router();

// Storage temporário em memória
let userData = null;

// Post - Salva informações do Formulário
router.post("/insert/post", (req, res) => {
  let dto;

  try {
    dto = new DataUserDto(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erro ao processar os dados", error: error.message });
  }

  userData = dto;
  res.status(200).json({ message: "Dados recebidos com sucesso", data: dto });
});

// Get - Calcula e retorna
router.get("/result/get", (req, res) => {
  if (!userData) {
    return res
      .status(404)
      .json({ message: "Nenhum dado encontrado. Envie os dados primeiro." });
  }

  const { peso, altura, pesoAlvo } = userData;
  const alturaEmMetros = altura > 10 ? altura / 100 : altura;

  const imc = peso / (alturaEmMetros * alturaEmMetros);
  const imcAlvo = pesoAlvo / (alturaEmMetros * alturaEmMetros);

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
    imcAlvo: {
      valor: parseFloat(imcAlvo.toFixed(2)),
      classificacao: classificarIMC(imcAlvo),
    },
    dados: userData,
  });
});

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
