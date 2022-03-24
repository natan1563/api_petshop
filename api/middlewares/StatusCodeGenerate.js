const NotFound = require('../erros/NotFound')
const InvalidField = require('../erros/InvalidField')
const RequiredField = require('../erros/RequiredField')
const UnsuportedValue = require('../erros/UnsuportedValue')
const { SerializadorErro } = require('../Serializador')

module.exports = (err, request, response, next) => {
  switch (true) {
    case (err instanceof NotFound):
      response.status(404)
      break
    
    case (err instanceof InvalidField):
    case (err instanceof RequiredField):
      response.status(400)
      break
    
    case (err instanceof UnsuportedValue):
      response.status(406)
      break
    
    default:
      response.status(500)
  }
  const serializador = new SerializadorErro(
    response.getHeader('Content-Type')
  )
  response.send(
    serializador.serializar({
      message: err.message,
      id: err.idError
    })
  )
}