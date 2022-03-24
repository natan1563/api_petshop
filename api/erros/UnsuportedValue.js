class UnsuportedValue extends Error {
  constructor (contentType) {
    super(`O tipo de conteudo ${contentType} não é suportado`);
    this.name = 'UnsuportedValue'
    this.idErro = 3
  }
}

module.exports = UnsuportedValue
