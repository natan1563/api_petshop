const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./erros/NotFound')

app.use(bodyParser.json())
app.use((request, response, next) => {
  const { acceptedFormats } = require('./Serializador')
  let requestFormat = request.header('Accept')
  
  if (requestFormat === '*/*') {
    requestFormat = 'application/json'
  }

  if (!acceptedFormats.includes(requestFormat)) {
    response.status(406)
    response.end()
    return
  }

  response.setHeader('Content-Type', requestFormat)
  next()
})

const roteador = require('./routes/fornecedores')
const checkStatusError = require('./middlewares/StatusCodeGenerate')

app.use('/api/fornecedores', roteador)
app.get('*', (req, res, next) => {
  throw new NotFound('Rota nao encontrada')
})
app.use('*', checkStatusError)

app.listen(config.get('api.port'), () => console.log('Running on the port 3000'))