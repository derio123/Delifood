const express = require('express')
const mongoose = require('mongoose')
const variables = require('../bin/settings/variables')

//routers
const categoriaRouter = require('../routes/categoria.router')
const produtoRouter = require('../routes/produto.router')

const app = express()

//ParseJson com express
app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect(variables.DB.connection)

app.use('/api/categoria/',categoriaRouter)
app.use('/api/produto/', produtoRouter)

module.exports = app  //module são pequenos pacotes para criar um sistema
//export externaliza as propriedades