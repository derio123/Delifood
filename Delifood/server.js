'use strict'

const app = require('../Delifood/bin/express')
const variables = require('../Delifood/bin/settings/variables')

app.listen(variables.Api.port, ()=> {
    console.info(`Inicialização completa da porta:${variables.Api.port}`)
})