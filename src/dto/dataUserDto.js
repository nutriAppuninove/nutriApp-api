class DataUserDto {
  constructor({ peso, altura, idade, frequencia, userId }) {
    this.peso = peso;
    this.altura = altura;
    this.idade = idade;
    this.frequencia = frequencia;
    this.userId = userId || null;
  }
}

module.exports = { DataUserDto };
