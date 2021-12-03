'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema

const produtoModel = new schema({
    nome: {type:String, required:true, trim:true, index:true},
    descricao: {type:String, required:true},
    preco: {type:Number, required:true},
    foto: {type:String, required:true},
    ativa: {type:Boolean, required:true},
    dataCriacao: {type:Date, Default:Date.now}
}, {versionKey:false});

produtoModel.pre('save', next => {
    let now = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = now;
    next();    
});

module.exports = mongoose.model('Produto', produtoModel);