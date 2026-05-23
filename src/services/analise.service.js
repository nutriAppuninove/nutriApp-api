const analiseRepository = require("../repository/analise.repository");
const {
  calcularIMCValor,
  classificarIMC,
  analisarHistorico,
  gerarMensagem,
} = require("../utils/imc.utils");

let lastSubmission = null;

const salvarSubmissao = async (dto) => {
  lastSubmission = dto;

  const dadosParaSalvar = {
    peso: dto.peso,
    altura: dto.altura,
    idade: dto.idade,
    frequencia: dto.frequencia,
    ...(dto.userId ? { userId: dto.userId, user: { id: dto.userId } } : {}),
  };

  await analiseRepository.save(dadosParaSalvar);
};

const calcularResultado = async (userId, dadosFormulario) => {
  const { peso, altura, frequencia, idade } = dadosFormulario;
  const alturaM = altura > 10 ? altura / 100 : altura;
  const imc = peso / (alturaM * alturaM);

  let contexto = null;

  if (userId) {
    const dadosBanco = await analiseRepository.buscarContextoUsuario(userId);

    if (dadosBanco) {
      contexto = {
        idade: dadosBanco.user?.idade ?? idade,
        pesoAtual: peso,
        pesoAlvo: dadosBanco.user?.pesoAlvo ?? null,
        historico: analisarHistorico(dadosBanco.analises),
      };
    }
  }

  return {
    imc: {
      valor: parseFloat(imc.toFixed(2)),
      classificacao: classificarIMC(imc),
    },
    mensagem: gerarMensagem(imc, frequencia, contexto),
    dados: dadosFormulario,
  };
};
const getLastSubmission = () => lastSubmission;

module.exports = { salvarSubmissao, calcularResultado, getLastSubmission };
