class DataUserDto {
  constructor({
    peso,
    altura,
    idade,
    frequencia,
    userId,
    pesoAlvo,
    pesoAtual,
  }) {
    this.peso = peso;
    this.altura = altura;
    this.idade = idade;
    this.frequencia = frequencia;
    this.userId = userId || null;
    this.pesoAlvo = pesoAlvo || null;
    this.pesoAtual = pesoAtual || null;
  }
}

module.exports = { DataUserDto };
