const TabelaFornecedor = require('./TabelaFornecedor')
const InvalidField = require('../../erros/InvalidField')
const RequiredField = require('../../erros/RequiredField')

class Fornecedor {
  constructor({id, empresa, email, categoria, dataCriacao,
     dataAtualizacao, versao}) {
    this.id = id
    this.empresa = empresa
    this.email = email
    this.categoria = categoria
    this.dataCriacao = dataCriacao
    this.dataAtualizacao = dataAtualizacao
    this.versao = versao 
    this.requiredFields = ['empresa', 'email', 'categoria'] 
  }

  async criar() {
    this.validar(this.requiredFields)
    const resultado = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    })

    this.id = resultado.id 
    this.dataCriacao = resultado.dataCriacao
    this.dataAtualizacao = resultado.dataAtualizacao
    this.versao = resultado.versao
  }

  async carregar () {
    const finder = await TabelaFornecedor.pegarPorId(this.id)

    this.empresa = finder?.empresa
    this.email = finder?.email
    this.categoria = finder?.categoria
    this.dataCriacao = finder?.dataCriacao
    this.dataAtualizacao = finder?.dataAtualizacao
    this.versao = finder?.versao
  }

  async atualizar() {
    await TabelaFornecedor.pegarPorId(this.id)
    const dadosAtualizar = {}

    this.validar(this.requiredFields, dadosAtualizar)

    if (!Object.keys(dadosAtualizar).length) {
      throw new RequiredField()
    }

    return await TabelaFornecedor.atualizar(this.id, dadosAtualizar)
  }

  remover() {
    return TabelaFornecedor.remover(this.id)
  }

  validar(requiredField, associate = false) {
    requiredField.forEach((campo) => {
      const valor = this[campo]

      if (typeof valor !== 'string' || !valor.length) {
        throw new InvalidField(campo)
      } 

      if (associate) 
        associate[campo] = valor
    })
  }
}

module.exports = Fornecedor