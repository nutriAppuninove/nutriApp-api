class DataUserDto {
  constructor({
    peso,
    altura,
    idade,
    quantidadeDeRefeicaoNoDia,
    isConsomeAlimentosCaloricos,
    pesoAlvo,
    isPraticaAtividadeFisica,
  }) {
    this.peso = peso;
    this.altura = altura;
    this.idade = idade;
    this.quantidadeDeRefeicaoNoDia = quantidadeDeRefeicaoNoDia;
    this.isConsomeAlimentosCaloricos = isConsomeAlimentosCaloricos;
    this.pesoAlvo = pesoAlvo;
    this.isPraticaAtividadeFisica = isPraticaAtividadeFisica;
  }
}

module.exports = { DataUserDto };
