const UnsuportedValue = require('./erros/UnsuportedValue')
const jsontoxml = require('jsontoxml')

class Serializador {
  json(dados) {
    return JSON.stringify(dados)
  }

  xml(dados) {
    let tag = this.tagSingular

    if (Array.isArray(dados)) {
      tag = this.tagPlural
      dados = dados.map(item => {
        return {
          [this.tagSingular]: item
        }
      })
    }

    return jsontoxml({ [tag]: dados })    
  }

  serializar(dados) {
    const filteredData = this.filtrar(dados)

    switch (this.contentType) {
      case 'application/json':
        return this.json(filteredData)

      case 'application/xml':
        return this.xml(filteredData)

      default:
        throw new UnsuportedValue(this.contentType)
    }
  }

  filtrarObjeto(dados) {
    let newObject = {}
    this.publicFields.forEach(field => {
      if (dados.hasOwnProperty(field)) {
        newObject[field] = dados[field]
      }
    })

    return newObject
  }

  filtrar(dados) {
    if (Array.isArray(dados)) {
      return dados.map(item => this.filtrarObjeto(item))
    }

    return this.filtrarObjeto(dados)
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType, camposExtras = []) {
    super()
    this.contentType = contentType
    this.publicFields = [
      'id', 
      'empresa', 
      'categoria'
    ].concat(camposExtras)
    this.tagSingular = 'fornecedor'
    this.tagPlural = 'fornecedores'
  }
}


class SerializadorErro extends Serializador {
  constructor(contentType, camposExtras = []) {
    super()
    this.contentType = contentType
    this.publicFields = [
      'id',
      'message'
    ].concat(camposExtras)
    this.tagSingular = 'erro'
    this.tagPlural = 'erros'
  }
}

module.exports = {
  Serializador,
  SerializadorFornecedor,
  SerializadorErro,
  acceptedFormats: [
    'application/json',
    'application/xml'
  ]
}