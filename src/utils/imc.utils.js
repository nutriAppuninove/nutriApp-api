const calcularIMCValor = (peso, altura) => {
  const alturaM = altura > 10 ? altura / 100 : altura;
  return peso / (alturaM * alturaM);
};

const classificarIMC = (valor) => {
  if (valor < 18.5) return "Abaixo do peso";
  if (valor < 25) return "Peso normal";
  if (valor < 30) return "Sobrepeso";
  if (valor < 35) return "Obesidade Grau I";
  if (valor < 40) return "Obesidade Grau II";
  return "Obesidade Grau III";
};

const analisarHistorico = (analises) => {
  if (!analises || analises.length < 2) return null;

  const ordenadas = [...analises].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  const imcs = ordenadas.map((a) => calcularIMCValor(a.peso, a.altura));
  const freqs = ordenadas.map((a) => a.frequencia).filter(Boolean);

  const imcInicial = imcs[0];
  const imcAtual = imcs[imcs.length - 1];
  const diffIMC = imcAtual - imcInicial;

  let tendenciaIMC;
  if (diffIMC < -0.5) tendenciaIMC = "emagrecendo";
  else if (diffIMC > 0.5) tendenciaIMC = "engordando";
  else tendenciaIMC = "estavel";

  let tendenciaFreq = null;
  if (freqs.length >= 2) {
    const metade = Math.ceil(freqs.length / 2);
    const mediaInicial =
      freqs.slice(0, metade).reduce((a, b) => a + b, 0) / metade;
    const mediaRecente =
      freqs.slice(metade).reduce((a, b) => a + b, 0) / (freqs.length - metade);
    const diffFreq = mediaRecente - mediaInicial;

    if (diffFreq > 0.5) tendenciaFreq = "melhorando";
    else if (diffFreq < -0.5) tendenciaFreq = "piorando";
    else tendenciaFreq = "estavel";
  }

  const diasDeHistorico = Math.floor(
    (new Date() - new Date(ordenadas[0].createdAt)) / (1000 * 60 * 60 * 24),
  );

  const imcPorMes =
    diasDeHistorico > 0
      ? parseFloat(((diffIMC / diasDeHistorico) * 30).toFixed(2))
      : 0;

  return {
    tendenciaIMC,
    tendenciaFreq,
    diffIMC: parseFloat(diffIMC.toFixed(2)),
    imcPorMes,
    diasDeHistorico,
    totalRegistros: analises.length,
  };
};

const gerarMensagem = (imc, frequencia, contexto) => {
  const partes = [];

  if (contexto?.historico) {
    const { tendenciaIMC, tendenciaFreq, diffIMC, imcPorMes, diasDeHistorico } =
      contexto.historico;

    if (diasDeHistorico >= 7) {
      if (tendenciaIMC === "emagrecendo") {
        partes.push(
          imcPorMes < -1
            ? `Seu IMC caiu ${Math.abs(diffIMC)} pontos, ótimo progresso! Cuidado para não emagrecer rápido demais.`
            : `Você está emagrecendo de forma consistente. Continue no ritmo!`,
        );
      } else if (tendenciaIMC === "engordando") {
        partes.push(
          imcPorMes > 1
            ? `Seu IMC subiu ${diffIMC} pontos em pouco tempo, vale revisar alimentação e exercícios.`
            : `Seu peso está aumentando aos poucos. Atenção antes que vire um hábito.`,
        );
      } else {
        partes.push(
          `Seu peso está estável nos últimos ${diasDeHistorico} dias.`,
        );
      }

      if (tendenciaFreq === "melhorando")
        partes.push(
          `Sua frequência de exercícios aumentou, os resultados vão aparecer em breve.`,
        );
      else if (tendenciaFreq === "piorando")
        partes.push(
          `Sua frequência de exercícios caiu. Tente retomar a rotina.`,
        );
    }
  }

  if (contexto?.pesoAlvo && contexto?.pesoAtual) {
    const { pesoAtual, pesoAlvo } = contexto;
    if (pesoAlvo < pesoAtual)
      partes.push(
        `Meta: perder ${(pesoAtual - pesoAlvo).toFixed(1)} kg para chegar em ${pesoAlvo} kg.`,
      );
    else if (pesoAlvo > pesoAtual)
      partes.push(
        `Meta: ganhar ${(pesoAlvo - pesoAtual).toFixed(1)} kg para chegar em ${pesoAlvo} kg.`,
      );
  }

  const idade = contexto?.idade ?? null;
  const idoso = idade >= 60;
  const jovem = idade !== null && idade < 30;
  const sedentario = !frequencia || frequencia <= 2;
  const ativo = frequencia >= 4;

  if (imc < 18.5) {
    if (idoso)
      partes.push(
        `Abaixo do peso em idade avançada pode indicar perda muscular. Priorize proteínas e consulte um médico.`,
      );
    else if (ativo)
      partes.push(
        `Você está abaixo do peso mas já se exercita bem. Foque em aumentar calorias com qualidade.`,
      );
    else if (sedentario)
      partes.push(
        `Para ganhar peso de forma saudável, combine treinos de força com mais proteína na dieta.`,
      );
    else
      partes.push(
        `Você está abaixo do peso. Um nutricionista pode montar um plano alimentar adequado.`,
      );
  } else if (imc < 25) {
    if (ativo)
      partes.push(`Parabéns! Peso ideal e rotina ativa — continue assim.`);
    else
      partes.push(
        `Seu peso está ótimo! Incluir exercícios vai melhorar ainda mais sua saúde.`,
      );
  } else if (imc < 30) {
    if (idoso && sedentario)
      partes.push(
        `Sobrepeso com baixa atividade pode agravar problemas articulares. Prefira caminhada ou natação.`,
      );
    else if (jovem && sedentario)
      partes.push(
        `Você tem sobrepeso e é jovem — esse é o melhor momento para mudar. Comece com 3x/semana de exercício.`,
      );
    else if (ativo)
      partes.push(
        `Você já se exercita, mas o sobrepeso indica que a alimentação precisa de atenção. Alimentação representa 70% do resultado.`,
      );
    else
      partes.push(
        `Combine exercícios regulares com alimentação equilibrada para sair do sobrepeso.`,
      );
  } else {
    if (idoso)
      partes.push(
        `Obesidade em idade avançada requer acompanhamento médico antes de iniciar qualquer atividade física.`,
      );
    else if (jovem && sedentario)
      partes.push(
        `Obesidade jovem com sedentarismo precisa de atenção agora. Pequenas mudanças diárias têm grande impacto.`,
      );
    else if (ativo)
      partes.push(
        `Você se exercita, o que é ótimo. A chave agora é a alimentação — considere um nutricionista.`,
      );
    else
      partes.push(
        `Recomendamos acompanhamento médico e nutricional para um plano seguro de emagrecimento.`,
      );
  }

  return partes.join(" ");
};

module.exports = {
  calcularIMCValor,
  classificarIMC,
  analisarHistorico,
  gerarMensagem,
};
