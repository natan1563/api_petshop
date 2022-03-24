class RequiredField extends Error {
  constructor() {
    super('Não foram fornecidos dados para atualizar')
    this.name = 'RequiredField'
    this.idError = 2
  }
}

module.exports = RequiredField