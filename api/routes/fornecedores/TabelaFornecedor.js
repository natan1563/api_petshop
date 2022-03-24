const Modelo = require('./ModeloTabelaFornecedor')
const NotFound = require('../../erros/NotFound')

module.exports = {
  listar() {
    return Modelo.findAll({ raw: true })
  },

  inserir(fornecedor) {
    return Modelo.create(fornecedor)
  },

  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id
      }
    })

    if (!encontrado)
      throw new NotFound()

    return encontrado
  },

  async atualizar(id, dadosAtualizar) {
    return await Modelo.update(
      dadosAtualizar,
      {
        where: { id },
        returning: true
      }
    )
  },

  remover (id) {
    return Modelo.destroyed({
      where: { id }
    })
  }
}