const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const { SerializadorFornecedor } = require('../../Serializador')

roteador.get('/', async (_, response, next) => {
  try {
    const resultados = await TabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(
      response.getHeader('Content-Type')
    )
    response.status(200).send(serializador.serializar(resultados))
  } catch (err) {
    next(err)
  }
})

roteador.post('/', async (requisicao, resposta, next) => {
  try {
    const request = requisicao.body
    const fornecedor = new Fornecedor(request)
    await fornecedor.criar()
    const serializar = new SerializadorFornecedor(
      resposta.getHeader('Content-Type')
    )
    resposta
      .status(201)
      .send(serializar.serializar(fornecedor))
  } catch (err) {
      next(err)
  }
})

roteador.get('/:idFornecedor', async (request, response, next) => {
  try {
    const id = request.params.idFornecedor
    const fornecedor = new Fornecedor({id})
    await fornecedor.carregar()
    const serializador = new SerializadorFornecedor(
      response.getHeader('Content-Type'),
      ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
    )
    response.send(serializador.serializar(fornecedor))
  } catch (err) {
    next(err)
  }
})

roteador.put('/:idFornecedor', async (request, response, next) => {
  try {
    const id = request.params.idFornecedor
    const dados = request.body
    const allData = Object.assign({}, dados, {id})
    const fornecedor = new Fornecedor(allData)
    await fornecedor.atualizar()
  
    response
      .status(204)
      .end()
  } catch(err) {
    next(err)
  }
})

roteador.delete('/:idFornecedor', async (request, response, next) => {
  try {
    const id = request.params.idFornecedor
    const fornecedor = new Fornecedor({ id })
    await fornecedor.carregar()
    fornecedor.remover()
    
    response
      .status(204)
      .end()
  } catch (e) {
    next(e)
  }
})

module.exports = roteador