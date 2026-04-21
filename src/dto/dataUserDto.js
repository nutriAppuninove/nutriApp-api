class DataUserDto {
  constructor({
    peso,
    altura,
    idade,
    quantidadeDeRefeicaoNoDia,
    isConsomeAlimentosCaloricos,
    pesoAlvo,
    isPraticaAtividadeFisica,
    objetivo,
  }) {
    this.peso = peso;
    this.altura = altura;
    this.idade = idade;
    this.quantidadeDeRefeicaoNoDia = quantidadeDeRefeicaoNoDia;
    this.isConsomeAlimentosCaloricos = isConsomeAlimentosCaloricos;
    this.pesoAlvo = pesoAlvo;
    this.isPraticaAtividadeFisica = isPraticaAtividadeFisica;
    this.objetivo = objetivo;
  }
}

module.exports = { DataUserDto };
