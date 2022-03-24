class InvalidField extends Error {
  constructor (field) {
    const message = `O campo ${field} é obrigatório.`
    super(message)
    this.name = 'InvalidField'
    this.idError = 1
  }
}

module.exports = InvalidField