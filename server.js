'use strict'

const app = require('../DeliFood.api/bin/express')
const variables = require('../DeliFood.api/bin/settings/variables')

app.listen(variables.Api.port, ()=> {
    console.info(`Inicialização completa da porta:${variables.Api.port}`)
})