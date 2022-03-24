class NotFound extends Error {
  constructor(message = 'Fornecedor não foi encontrado') {
    super(message)
    this.name = 'NotFound'
    this.idError = 0
  }
}

module.exports = NotFound
